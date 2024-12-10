import React from 'react';
import { Box, Heading, Text, Button, Stack, Flex, Spacer } from '@chakra-ui/react';

// Mock data 

const currentUser = {
  id: 1,
  role: 'parent', // 'parent' или 'child'
  name: 'Иван'
};

const familyData = {
  parents: [
    { id: 1, name: 'Иван', role: 'parent' },
    { id: 2, name: 'Мария', role: 'parent' }
  ],
  children: [
    { id: 3, name: 'Дима', role: 'child', balance: 10 },
    { id: 4, name: 'Аня', role: 'child', balance: 5 }
  ]
};

const FamilyBlock = () => {
  const isParent = currentUser.role === 'parent';

  if (!isParent) return null;

  const handleAddMember = () => {
    console.log('Открыть форму для добавления члена семьи');
  };

  const handleTopUp = (childId) => {
    console.log(`Пополнить баланс ребенку с id ${childId}`);
  };

  return (
    <Box border="1px solid" borderColor="gray.200" borderRadius="md" p={4} mb={4}>
      <Heading size="2xl" mb={4}>Члены семьи</Heading>

      {/* Parents */}
      <Box mb={4}>
        <Heading size="lg" mb={2}>Родители:</Heading>
        <Stack spacing={2}>
          {familyData.parents.map(parent => (
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
        <Heading size="lg" mb={2}>Дети:</Heading>
        <Stack spacing={2}>
          {familyData.children.map(child => (
              <Flex key={child.id} align="center">
                <Box>
                  <Text>{child.name}</Text>
                </Box>
                <Spacer />
                <Box>
                  <Text>{child.balance} ⭐️</Text>
                </Box>
                <Box ml="4">
                  <Button size="sm" colorScheme="teal" onClick={() => handleTopUp(child.id)}>
                    Пополнить
                  </Button>
                </Box>
              </Flex>
            )
          )}
        </Stack>
      </Box>

      { /* Add member button */ }
      <Button colorScheme="blue" onClick={handleAddMember}>
        Добавить члена семьи
      </Button>
    </Box>
  );
};

export default FamilyBlock;