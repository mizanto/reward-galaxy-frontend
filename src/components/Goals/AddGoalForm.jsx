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

const AddGoalForm = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('https://via.placeholder.com/150');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!title.trim() || price <= 0 || !image.trim()) {
      setError('Пожалуйста, заполните все поля корректно');
      return;
    }
    setError('');
    onSubmit({ title, price, image });
    setTitle('');
    setPrice('');
    setImage('https://via.placeholder.com/150');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        {error && <Text color="red.500" mb={4}>{error}</Text>}
        <ModalHeader>Добавить цель</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Название цели</FormLabel>
            <Input 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
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
            isDisabled={!title.trim() || price <= 0 || !image.trim()}
          >
            Добавить
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddGoalForm;