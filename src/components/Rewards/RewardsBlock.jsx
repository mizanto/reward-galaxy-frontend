import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, SimpleGrid, Flex, Spacer, Heading, Spinner, Text } from "@chakra-ui/react";

import RewardCard from "./RewardCard";
import AddRewardForm from "./AddRewardForm";
import MessageBox from '../Common/MessageBox';
import { addReward, removeReward, purchaseReward, fetchRewards } from "../../redux/rewardsSlice";
import { updateBalance } from "../../redux/userSlice";
import { addTransaction } from "../../redux/transactionsSlice";
import { createReward } from "../../api/rewardService";
import { parseRewardData, parseAddRewardError } from "../../utils/parser";

const calculateGoalProgress = (balance, price) => ({
  progress: Math.min((balance / price) * 100, 100), // limit progress to 100%
  progressColor:
    balance / price < 0.3 ? "red" :
    balance / price < 0.5 ? "yellow" :
    balance / price < 0.7 ? "green" : "teal",
});

const RewardsBlock = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const allRewards = useSelector((state) => state.rewards.items);
  const { status, error } = useSelector((state) => state.family);

  const isParent = currentUser.role === 'parent';
  
  const filterRewardsForChildren = (reward) =>
    !reward.purchasedBy || reward.purchasedBy === currentUser.id;
  const rewards = isParent ? allRewards : allRewards.filter(filterRewardsForChildren);

  const [isAddRewardOpen, setAddRewardOpen] = useState(false);
  const [serverError, setServerError] = useState(null); 

  useEffect(() => {
      dispatch(fetchRewards());
    }, [dispatch]);

  // event handlers
  const onAddRewardClick = () => setAddRewardOpen(true);

  const onAddRewardSubmit = async ({ name, price, image }) => {
    try {
      const rewardData = await createReward({ name, price, image });
      const newReward = parseRewardData(rewardData);
      dispatch(addReward(newReward));
    } catch (error) {
      const parsedErrors = parseAddRewardError(error);
      const errorMessage = parsedErrors.join('. ');
      setServerError(errorMessage);
    }
  };

  const onDeleteReward = (rewardId) => {
    console.log(`Delete reward with id ${rewardId}`)
    dispatch(removeReward(rewardId));
  };

  const onPurchaseReward = (rewardId) => {
    const reward = allRewards.find(r => r.id === rewardId);
    if (!reward || currentUser.balance < reward.price) return;

    // Списание звёздочек
    dispatch(updateBalance({ amount: -reward.price }));

    // Обновление статуса цели
    dispatch(purchaseReward({ rewardId, userId: currentUser.id }));

    // Запись транзакции
    dispatch(addTransaction({
      amount: -reward.price,
      reason: `Покупка цели: ${reward.title}`,
    }));
  };

  // render
  const renderRewardCards = () => (
    <SimpleGrid columns={{ base: 1, md: 3, lg: 4, xl: 6 }} gap="20px">
      {rewards.map((reward) => {
        const { progress, progressColor } = calculateGoalProgress(currentUser.balance, reward.price);

        return (
          <RewardCard
            key={reward.id}
            reward={reward}
            userRole={currentUser.role}
            balance={currentUser.balance}
            progress={progress}
            progressColor={progressColor}
            onDeleteReward={onDeleteReward}
            onPurchaseReward={onPurchaseReward}
          />
        );
      })}
    </SimpleGrid>
  );

  const renderParentView = () => (
    <>
      <Flex>
        <Heading size="xl" mb="4" mr="4">Награды</Heading>

        {/* MessageBox для ошибок */}
        {serverError && <MessageBox message={serverError} type='error' onClose={() => setServerError(null)} />}
        <Spacer />

        <Button flexShrink="0" colorScheme='teal' mb="4" ml="4" onClick={onAddRewardClick}>
          Добавить награду
        </Button>
      </Flex>
      {renderRewardCards()}
    </>
  );

  const renderChildView = () => (
    <>
      <Flex>
        <Heading size="xl" mb={4}>Баланс: {currentUser.balance} ⭐️</Heading>
      </Flex>
      {renderRewardCards()}
    </>
  );

  if (status === 'loading') {
    return <Spinner size="xl" color="teal" />;
  }

  if (status === 'failed') {
    return <Text color="red.500">Ошибка: {error}</Text>;
  }

  return (
    <Box
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      p={4}
      mb={4}
      h="100%"
      overflow="auto"
    >
      {isParent ? renderParentView() : renderChildView()}
      <AddRewardForm
        isOpen={isAddRewardOpen}
        onClose={() => setAddRewardOpen(false)}
        onSubmit={onAddRewardSubmit}
      />
    </Box>
  );
};

export default RewardsBlock;