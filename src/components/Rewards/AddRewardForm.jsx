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
  NumberInput,
  NumberInputField,
  Text
} from '@chakra-ui/react';

const AddRewardForm = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!name.trim() || price <= 0) {
      setError('Пожалуйста, заполните все поля корректно');
      return;
    }
    setError('');
    onSubmit({ name, price, image });
    setName('');
    setPrice('');
    setImage('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Добавить цель</ModalHeader>
        {error && <Text color="red.500" mb={4}>{error}</Text>}
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Название цели</FormLabel>
            <Input 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Введите название" 
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Цена ⭐️</FormLabel>
            <NumberInput 
              value={price} 
              onChange={(valueString) => setPrice(parseInt(valueString, 10) || 0)} 
              min={0}
            >
              <NumberInputField />
            </NumberInput>
          </FormControl>

          <FormControl>
            <FormLabel>Ссылка на изображение</FormLabel>
            <Input 
              value={image} 
              onChange={(e) => setImage(e.target.value)} 
              placeholder="https://..." 
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>Отмена</Button>
          <Button 
            colorScheme="teal" 
            onClick={handleSubmit} 
            ml={3}
            isDisabled={!name.trim() || price <= 0}
          >
            Добавить
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddRewardForm;