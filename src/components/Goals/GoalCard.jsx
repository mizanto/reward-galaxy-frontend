import React from "react";
import { Box, Button, Text, Image, Flex, Spacer, Progress } from "@chakra-ui/react";

const GoalCard = ({ goal, userRole, balance, progress, progressColor, onDeleteGoal, onPurchaseGoal }) => {
  const buttonTitle = userRole === "parent"
    ? "Удалить"
    : balance < goal.price
      ? `Не хватает ${goal.price - balance} ⭐️`
      : "Купить";

  const isDisabled = userRole === "child" && balance < goal.price;

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
        <Button
          size="md"
          width="100%"
          colorScheme={userRole === "parent" ? "red" : "teal"}
          isDisabled={isDisabled}
          onClick={() => (userRole === "parent" ? onDeleteGoal(goal.id) : onPurchaseGoal(goal.id))}
        >
          {buttonTitle}
        </Button>
      </Flex>
    </Box>
  );
};

export default GoalCard;