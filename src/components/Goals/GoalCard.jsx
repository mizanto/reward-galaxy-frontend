import React from "react";
import { Box, Button, Text, Image, Flex, Spacer } from "@chakra-ui/react";

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

export default GoalCard;