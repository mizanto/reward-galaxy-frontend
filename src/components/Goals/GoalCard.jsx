import React from "react";
import { Box, Button, Text, Image, Flex, Spacer, Progress } from "@chakra-ui/react";

const GoalCard = ({ balance, goal, userRole, onDeleteGoal, onPurchaseGoal }) => {
  let buttonTitle;
  if (userRole === "parent") {
    buttonTitle = "Удалить";
  } else {
    buttonTitle = balance < goal.price ? `Не хватает ${goal.price - balance} ⭐️` : "Купить";
  }

  const progress = (balance / goal.price) * 100;
  let progressColor;
  if (progress < 30) {
    progressColor = "red";
  } else if (progress < 50) {
    progressColor = "yellow";
  } else if (progress < 70) {
    progressColor = "green";
  } else { 
    progressColor = "teal";
  }

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

      {userRole === "child" && (
        <Progress mb="4" size="sm" colorScheme={progressColor} value={progress} />
      )}

      <Flex mt="auto">
        {userRole === "parent" && (
          <Button
            size="md"
            width="100%"
            colorScheme='red'
            onClick={() => onDeleteGoal(goal.id)}
          >
            {buttonTitle}
          </Button>
        )}
        {userRole === "child" && (
          <Button
            size="md"
            width="100%"
            colorScheme='teal'
            isDisabled={balance < goal.price}
            onClick={() => onPurchaseGoal(goal.id)}
          >
            {buttonTitle}
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default GoalCard;