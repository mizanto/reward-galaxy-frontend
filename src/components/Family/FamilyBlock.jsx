import React, { useState } from 'react';
import { Box, Heading, Text, Button, Stack, Flex, Spacer } from '@chakra-ui/react';

import AddMemberForm from './AddMemberForm';
import TopupForm from './TopupForm';

const FamilyBlock = ({currentUser, family}) => {
  const {parents, children} = family;
  const isParent = currentUser.role === 'parent';

  const [isAddMemberOpen, setAddMemberOpen] = useState(false);
  const [isTopupOpen, setTopupOpen] = useState(false);
  const [selectedChildId, setSelectedChildId] = useState(null);

  if (!isParent) return null;

  const handleAddMemberClick = () => {
    setAddMemberOpen(true);
  };

  const handleTopUpClick = (childId) => {
    setSelectedChildId(childId);
    setTopupOpen(true);
  };

  const handleAddMemberSubmit = ({ name, email, role }) => {
    console.log(`Добавить члена семьи: ${name} ${email} (${role})`);
  };

  const handleTopUpSubmit = ({ amount, reason }) => {
    console.log(`Пополнить баланс ребенку с id ${selectedChildId} на сумму ${amount}, причина: ${reason}`);
    setSelectedChildId(null);
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
      minW={60}
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
                    onClick={() => handleTopUpClick(child.id)}
                  >
                    +
                  </Button>
                </Box>
              </Flex>
            )
          )}
        </Stack>
      </Box>

      <Spacer />

      <Flex mt="auto">
        <Button 
          bg="teal.500" 
          color="white"
          _hover={{ bg: "teal.600" }} 
          width="100%" 
          onClick={handleAddMemberClick}
        >
          Добавить члена семьи
        </Button>
        <AddMemberForm 
          isOpen={isAddMemberOpen} 
          onClose={() => setAddMemberOpen(false)} 
          onSubmit={handleAddMemberSubmit}
        />
        <TopupForm 
          isOpen={isTopupOpen}
          onClose={() => setTopupOpen(false)}
          onSubmit={handleTopUpSubmit}
        />
      </Flex>
    </Box>
  );
};

export default FamilyBlock;