import React, { useState } from "react";
import { Box, Button, SimpleGrid, Flex, Spacer, Heading } from "@chakra-ui/react";

import GoalCard from "./GoalCard";
import AddGoalForm from "./AddGoalForm";

const GoalsBlock = ({currentUser, goals}) => {
  const isParent = currentUser.role === 'parent';

  const [isAddGoalOpen, setAddGoalOpen] = useState(false);

  const onAddGoalClick = () => {
    setAddGoalOpen(true);
  };

  const onAddGoalSubmit = ({ title, price, image }) => {
    console.log(`Добавить цель: ${title} ${price} ${image}`)
  };

  const onDeleteGoal = (goalId) => {
    console.log(`Delete goal with id ${goalId}`)
  };

  const onPurchaseGoal = (goalId) => {
    console.log(`Purchase goal with id ${goalId}`)
  };

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
      <Flex>
        <Heading size="xl" mb={4}>Цели</Heading>
        <Spacer/>
        {isParent ? (
          <Button 
            bg="teal.500" 
            color="white"
            _hover={{ bg: "teal.600" }}
            mb="4" 
            onClick={onAddGoalClick}
          >
            Добавить цель
          </Button>
        ) : (
          <Heading size="xl" mb={4}>Баланс: {currentUser.balance} ⭐️</Heading>
        )}
      </Flex>
      <SimpleGrid columns={{ base: 1, md: 3, lg: 4, xl: 6 }} gap="20px">
        {goals.map((goal) => (
          <GoalCard
            balance={currentUser.balance}
            key={goal.id}
            goal={goal}
            userRole={currentUser.role}
            onDeleteGoal={onDeleteGoal}
            onPurchaseGoal={onPurchaseGoal}
          />
        ))}
      </SimpleGrid>

      <AddGoalForm 
        isOpen={isAddGoalOpen} 
        onClose={() => setAddGoalOpen(false)} 
        onSubmit={onAddGoalSubmit}
      />
    </Box>
  );
};

export default GoalsBlock;