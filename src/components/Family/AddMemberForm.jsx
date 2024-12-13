import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
} from '@chakra-ui/react';

const AddMemberForm = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('child');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!name.trim() || !email.trim()) {
      setError('Введите корректные данные');
      return;
    }
    setError('');
    onSubmit({ name, email, role });
    setName('');
    setEmail('');
    setRole('child');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Добавить члена семьи</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {error && <Text color="red.500" mb={4}>{error}</Text>}
          <FormControl mb={4}>
            <FormLabel>Имя</FormLabel>
            <Input 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Введите имя" 
            />
          </FormControl>

          <FormControl mb={4}>
          <FormLabel>Email</FormLabel>
            <Input 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Введите e-mail" 
            />
          </FormControl>

          <FormControl>
            <FormLabel>Роль</FormLabel>
            <Select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="parent">Родитель</option>
              <option value="child">Ребенок</option>
            </Select>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>Отмена</Button>
          <Button 
            colorScheme="blue" 
            onClick={handleSubmit} 
            ml={3} 
            isDisabled={!name.trim() || !email.trim()} 
          >
            Добавить
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddMemberForm;