import React from 'react';
import { Box, Heading, Text, Button, Stack, Flex, Spacer, Span } from '@chakra-ui/react';

const FamilyBlock = ({currentUser, family}) => {
  const {parents, children} = family;
  const isParent = currentUser.role === 'parent';

  if (!isParent) return null;

  const handleAddMember = () => {
    console.log('Открыть форму для добавления члена семьи');
  };

  const handleTopUp = (childId) => {
    console.log(`Пополнить баланс ребенку с id ${childId}`);
  };

  return (
    <Box 
      border="1px solid" 
      borderColor="gray.200" 
      borderRadius="md" 
      p={4} 
      mb={4}
      display="flex"
      flexDirection="column"
      h="100%"
      overflow="auto"
    >
      <Heading size="2xl" mb={4}>Семья</Heading>

      {/* Parents */}
      <Box mb={4}>
        <Heading size="lg" mb={2}>Родители</Heading>
        <Stack spacing={2}>
          {parents.map(parent => (
            <Flex key={parent.id} align="center">
              <Text>
                {parent.name} {parent.id === currentUser.id && '(вы)'}
              </Text>
            </Flex>
          ))}
        </Stack>
      </Box>

      {/* Childred */}
      <Box mb={4}>
        <Heading size="lg" mb={2}>Дети</Heading>
        <Stack spacing={2}>
          {children.map(child => (
              <Flex key={child.id} align="center">
                <Box>
                  <Text>{child.name}</Text>
                </Box>
                <Spacer />
                <Box>
                  <Text>{child.balance} ⭐️</Text>
                </Box>
                <Box ml="4">
                  <Button 
                    bg="teal.500" 
                    color="white"
                    _hover={{ bg: "teal.600" }} 
                    onClick={() => handleTopUp(child.id)}
                  >
                    +
                  </Button>
                </Box>
              </Flex>
            )
          )}
        </Stack>
      </Box>

      <Span />

      <Flex mt="auto">
        <Button 
          bg="teal.500" 
          color="white"
          _hover={{ bg: "teal.600" }} 
          width="100%" 
          onClick={handleAddMember}
        >
          Добавить члена семьи
        </Button>
      </Flex>
    </Box>
  );
};

export default FamilyBlock;