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
  Select
} from '@chakra-ui/react';

const AddMemberForm = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('child'); // по умолчанию child

  const handleSubmit = () => {
    onSubmit({ name, email, role });
    setName('');
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
          <Button colorScheme="blue" onClick={handleSubmit} ml={3}>
            Добавить
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddMemberForm;