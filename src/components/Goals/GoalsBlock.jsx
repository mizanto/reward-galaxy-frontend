import React from "react";
import { Box, Button, SimpleGrid, Text, Image, Flex, Spacer, Heading } from "@chakra-ui/react";

const goals = [
    {
      id: 1,
      title: "Игрушечная машинка",
      price: 50,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Книга",
      price: 30,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      title: "Набор для рисования",
      price: 70,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 1,
      title: "Игрушечная машинка",
      price: 50,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Книга",
      price: 30,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      title: "Набор для рисования",
      price: 70,
      image: "https://via.placeholder.com/150",
    },
  ];

const GoalsBlock = () => {
  const userRole = "parent";

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
      {userRole === "parent" && (
        <Flex>
          <Heading size="2xl" mb={4}>Цели</Heading>
          <Spacer />
          <Button 
            bg="teal.500" 
            color="white"
            _hover={{ bg: "teal.600" }}
            mb="4" 
            onClick={onAddGoal}
          >
            Добавить цель
          </Button>
        </Flex>
      )}
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 6 }} gap="20px">
        {goals.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            userRole={userRole}
            onDeleteGoal={onDeleteGoal}
            onPurchaseGoal={onPurchaseGoal}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

const GoalCard = ({ goal, userRole, onDeleteGoal, onPurchaseGoal }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      shadow="md"
      p="4"
      bg="white"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignContent="center"
      height="100%"
      minW={150}
    >
      <Image src={goal.image} alt={goal.title} borderRadius="md" mb="4" />
      <Text fontWeight="bold" fontSize="lg" mb="2">
        {goal.title}
      </Text>
      <Spacer />
      <Text color="gray.600" mb="4">
        Цена: {goal.price} ⭐️
      </Text>
      <Flex mt="auto">
        {userRole === "parent" && (
          <Button
            size="sm"
            width="100%"
            bg="red.500"
            color="white" 
            _hover={{ bg: "red.600" }}
            onClick={() => onDeleteGoal(goal.id)}
          >
            Удалить
          </Button>
        )}
        {userRole === "child" && (
          <Button
            size="sm"
            width="100%"
            bg="teal.500"
            color="white" 
            _hover={{ bg: "teal.600" }}
            onClick={() => onPurchaseGoal(goal.id)}
          >
            Купить
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default GoalsBlock;