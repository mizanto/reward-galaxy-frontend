import React from "react";
import { Box, Button, SimpleGrid, Flex, Spacer, Heading } from "@chakra-ui/react";

import GoalCard from "./GoalCard";

const GoalsBlock = ({currentUser, goals}) => {
  const isParent = currentUser.role === 'parent';

  const onAddGoal = () => {
    console.log("Add goal")
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
        <Heading size="2xl" mb={4}>Цели</Heading>
        <Spacer/>
        {isParent && (
            <Button 
              bg="teal.500" 
              color="white"
              _hover={{ bg: "teal.600" }}
              mb="4" 
              onClick={onAddGoal}
            >
              Добавить цель
            </Button>
        )}
      </Flex>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 6 }} gap="20px">
        {goals.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            userRole={currentUser.role}
            onDeleteGoal={onDeleteGoal}
            onPurchaseGoal={onPurchaseGoal}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default GoalsBlock;