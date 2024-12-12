import React, { useState } from 'react';
import { Box, Heading, Text, Button, Stack, Flex, Spacer } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';

import AddMemberForm from './AddMemberForm';
import TopupForm from './TopupForm';
import YesNoAlert from '../Common/YesNoAlert';
import { addMember, removeMember, topUpChildBalance } from '../../redux/familySlice';

const FamilyBlock = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const members = useSelector((state) => state.family.members);
  const isParent = currentUser.role === 'parent';

  const [isAddMemberOpen, setAddMemberOpen] = useState(false);
  const [isRemoveMemberOpen, setRemoveMemberOpen] = useState(false);
  const [isTopupOpen, setTopupOpen] = useState(false);
  const [childIdToTopUp, setChildIdToTopUp] = useState(null);
  const [memberToRemove, setMemberToRemove] = useState(null);

  if (!isParent) return null;

  const handleAddMemberClick = () => {
    setAddMemberOpen(true);
  };

  const handleTopUpClick = (childId) => {
    setChildIdToTopUp(childId);
    setTopupOpen(true);
  };

  const handleRemoveMemberClick = (member) => {
    setMemberToRemove(member);
    setRemoveMemberOpen(true);
  };

  const handleRemoveMemberSubmit = () => {
    console.log(`Удалить члена семьи с id ${memberToRemove.id}`);
    dispatch(removeMember(memberToRemove.id));
    setRemoveMemberOpen(false);
  };

  const handleAddMemberSubmit = ({ name, email, role }) => {
    console.log(`Добавить члена семьи: ${name} ${email} (${role})`);
    dispatch(addMember({ name, email, role }));
  };

  const handleTopUpSubmit = ({ amount, reason }) => {
    console.log(`Пополнить баланс ребенку с id ${childIdToTopUp} на сумму ${amount}, причина: ${reason}`);
    
    if (!isNaN(amount) && amount !== 0) {
      dispatch(topUpChildBalance({ childId: childIdToTopUp, amount, reason }));
    }
    setChildIdToTopUp(null);
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
      <Heading size="xl" mb={4}>Семья</Heading>

      {/* Parents */}
      <Box mb={4}>
        <Heading size="md" mb={2}>Родители</Heading>
        <Stack spacing={2}>
          {members.filter(m => m.role === 'parent').map(parent => (
            <Flex key={parent.id} align="center">
              <Box>
                <Text>
                  {parent.name} {parent.id === currentUser.id && '(вы)'}
                </Text>
              </Box>
              {parent.id !== currentUser.id && (
                <Box ml="2">
                <Button 
                  size="xs" 
                  variant='ghost' 
                  colorScheme='red'
                  onClick={() => handleRemoveMemberClick(parent)}
                >
                  Удалить
                </Button>
                </Box>
              )}
            </Flex>
          ))}
        </Stack>
      </Box>

      {/* Childred */}
      <Box mb={4}>
        <Heading size="md" mb={2}>Дети</Heading>
        <Stack spacing={2}>
          {members.filter(m => m.role === 'child').map(child => (
              <Flex key={child.id} align="center">
                <Box>
                  <Text>{child.name}</Text>
                </Box>
                <Box ml="2">
                  <Button 
                    size="xs" 
                    variant='ghost' 
                    colorScheme='red'
                    onClick={() => handleRemoveMemberClick(child)}
                  >
                    Удалить
                  </Button>
                </Box>
                <Spacer />
                <Box>
                  <Text>{child.balance} ⭐️</Text>
                </Box>
                <Box ml="2">
                  <Button 
                    size="sm" 
                    colorScheme='teal'
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
          colorScheme='teal' 
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
        <YesNoAlert
          isOpen={isRemoveMemberOpen}
          title="Удалить члена семьи"
          message={
            <>
              Вы уверены, что хотите удалить члена семьи по имени <b>{memberToRemove?.name}</b>?
            </>
          }
          type="destructive"
          onClose={() => setRemoveMemberOpen(false)}
          onYes={handleRemoveMemberSubmit}
        />
      </Flex>
    </Box>
  );
};

export default FamilyBlock;