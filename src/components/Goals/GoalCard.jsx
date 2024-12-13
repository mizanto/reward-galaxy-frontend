import React from "react";
import { Box, Button, Text, Image, Flex, Spacer, Progress, Badge } from "@chakra-ui/react";

const GoalCard = ({ goal, userRole, balance, progress, progressColor, onDeleteGoal, onPurchaseGoal }) => {
  const isPurchased = !!goal.purchasedBy;
  const canPurchase = balance >= goal.price;

  const buttonTitle = userRole === "parent" 
    ? "Удалить" 
    : isPurchased
    ? "Приобретено"
    : canPurchase
    ? "Купить" 
    : `Не хватает ${goal.price - balance} ⭐️`;

  const isDisabled = userRole === "child" && (!canPurchase || isPurchased);

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
      {/* Image with Badge */}
      <Box position="relative" mb="4">
        <Image 
          src={goal.image} 
          alt={goal.title} 
          objectFit="cover" 
          width="100%" 
          borderRadius="md" 
        />
        {isPurchased && (
          <Badge 
            colorScheme="green" 
            fontSize="0.8em" 
            position="absolute" 
            top="8px" 
            right="8px"
          >
            Куплено
          </Badge>
        )}
      </Box>

      <Text fontWeight="bold" fontSize="lg" mb="2">
        {goal.title}
      </Text>

      <Spacer />

      <Text color="gray.600" mb="4">
        Цена: {goal.price} ⭐️
      </Text>

      {userRole === "child" && !isPurchased && (
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