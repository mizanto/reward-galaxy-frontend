import React, { useState, useEffect } from 'react';
import { Box, Heading, Button, Flex, Spacer, Spinner, Text } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';

import AddMemberForm from './AddMemberForm';
import TopupForm from './TopupForm';
import MemberList from './MemberList';
import YesNoAlert from '../Common/YesNoAlert';
import { addMember, removeMember, topUpChildBalance, selectChildren, selectParents, fetchFamilyMembers } from '../../redux/familySlice';
import { addTransaction } from '../../redux/transactionsSlice';

const FamilyBlock = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const parents = useSelector(selectParents);
  const children = useSelector(selectChildren);
  const { status, error } = useSelector((state) => state.family);
  const isParent = currentUser.role === 'parent';

  const [modal, setModal] = useState(null); // 'addMember', 'removeMember', 'topUp'
  const [childIdToTopUp, setChildIdToTopUp] = useState(null);
  const [memberToRemove, setMemberToRemove] = useState(null);

  useEffect(() => {
    dispatch(fetchFamilyMembers());
  }, [dispatch]);

  const openModal = (type) => setModal(type);
  const closeModal = () => setModal(null);

  const handleAddMemberSubmit = ({ name, email, role }) => {
    dispatch(addMember({ name, email, role }));
    closeModal();
  };

  const handleTopUpSubmit = ({ amount, reason }) => {
    if (!isNaN(amount) && amount !== 0) {
      dispatch(topUpChildBalance({ childId: childIdToTopUp, amount, reason }));

      dispatch(addTransaction({
        amount: amount,
        reason: reason,
      }));
    }
    closeModal();
  };

  const handleRemoveMemberSubmit = () => {
    dispatch(removeMember(memberToRemove.id));
    closeModal();
  };

  if (!isParent) return null;

  if (status === 'loading') {
    return <Spinner size="xl" color="teal" />;
  }

  if (status === 'failed') {
    return <Text color="red.500">Ошибка: {error}</Text>;
  }

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
      <MemberList
        title={'Родители'}
        members={parents}
        currentUserId={currentUser.id}
        onRemove={(parent) => {
          setMemberToRemove(parent);
          openModal('removeMember');
        }}
      />

      {/* Children */}
      <MemberList
        title={'Дети'}
        members={children}
        currentUserId={currentUser.id}
        onRemove={(child) => {
          setMemberToRemove(child);
          openModal('removeMember');
        }}
        onTopUp={(childId) => {
          setChildIdToTopUp(childId);
          openModal('topUp');
        }}
      />

      <Spacer />

      <Flex mt="auto">
        <Button colorScheme="teal" width="100%" onClick={() => openModal('addMember')}>
          Добавить члена семьи
        </Button>
      </Flex>

      {modal === 'addMember' && (
        <AddMemberForm isOpen={true} onClose={closeModal} onSubmit={handleAddMemberSubmit} />
      )}
      {modal === 'topUp' && (
        <TopupForm isOpen={true} onClose={closeModal} onSubmit={handleTopUpSubmit} />
      )}
      {modal === 'removeMember' && (
        <YesNoAlert
          isOpen={true}
          title="Удалить члена семьи"
          message={`Вы уверены, что хотите удалить ${memberToRemove?.name}?`}
          type="destructive"
          onClose={closeModal}
          onYes={handleRemoveMemberSubmit}
        />
      )}
    </Box>
  );
};

export default FamilyBlock;