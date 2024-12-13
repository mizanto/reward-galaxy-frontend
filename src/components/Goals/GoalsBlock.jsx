import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, SimpleGrid, Flex, Spacer, Heading } from "@chakra-ui/react";

import GoalCard from "./GoalCard";
import AddGoalForm from "./AddGoalForm";
import { addGoal, removeGoal } from "../../redux/goalsSlice";

const calculateGoalProgress = (balance, price) => ({
  progress: Math.min((balance / price) * 100, 100), // limit progress to 100%
  progressColor:
    balance / price < 0.3 ? "red" :
    balance / price < 0.5 ? "yellow" :
    balance / price < 0.7 ? "green" : "teal",
});

const GoalsBlock = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const goals = useSelector((state) => state.goals.items);

  const isParent = currentUser.role === 'parent';

  const [isAddGoalOpen, setAddGoalOpen] = useState(false);

  // event handlers
  const onAddGoalClick = () => setAddGoalOpen(true);

  const onAddGoalSubmit = ({ title, price, image }) => {
    console.log(`Добавить цель: ${title} ${price} ${image}`)
    dispatch(addGoal({ title, price, image }));
  };

  const onDeleteGoal = (goalId) => {
    console.log(`Delete goal with id ${goalId}`)
    dispatch(removeGoal(goalId));
  };

  const onPurchaseGoal = (goalId) => {
    console.log(`Purchase goal with id ${goalId}`)
  };

  // render
  const renderGoalCards = () => (
    <SimpleGrid columns={{ base: 1, md: 3, lg: 4, xl: 6 }} gap="20px">
      {goals.map((goal) => {
        const { progress, progressColor } = calculateGoalProgress(currentUser.balance, goal.price);

        return (
          <GoalCard
            key={goal.id}
            goal={goal}
            userRole={currentUser.role}
            balance={currentUser.balance}
            progress={progress}
            progressColor={progressColor}
            onDeleteGoal={onDeleteGoal}
            onPurchaseGoal={onPurchaseGoal}
          />
        );
      })}
    </SimpleGrid>
  );

  const renderParentView = () => (
    <>
      <Flex>
        <Heading size="xl" mb={4}>Цели</Heading>
        <Spacer />
        <Button colorScheme='teal' mb="4" onClick={onAddGoalClick}>
          Добавить цель
        </Button>
      </Flex>
      {renderGoalCards()}
    </>
  );

  const renderChildView = () => (
    <>
      <Flex>
        <Heading size="xl" mb={4}>Баланс: {currentUser.balance} ⭐️</Heading>
      </Flex>
      {renderGoalCards()}
    </>
  );

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
      <AddGoalForm
        isOpen={isAddGoalOpen}
        onClose={() => setAddGoalOpen(false)}
        onSubmit={onAddGoalSubmit}
      />
    </Box>
  );
};

export default GoalsBlock;