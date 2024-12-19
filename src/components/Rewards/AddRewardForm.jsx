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
} from '@chakra-ui/react';

import RequiredFormLabel from '../Common/RequiredFormLabel'
import { validateAddRewardForm } from '../../utils/validation';
import ErrorMessage from '../Common/ErrorMessage';

const AddRewardForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: ''
  });
  const [errors, setErrors] = useState('');

  const handleTextInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberInputChange = (value) => {
    setFormData((prev) => ({ ...prev, price: value }));
  };

  const handleSubmit = () => {
    const formErrors = validateAddRewardForm(formData);
    if (formErrors.length > 0) {
      setErrors(formErrors);
      return;
    }
    onSubmit(formData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({ name: '', price: '', image: '' });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Добавить цель</ModalHeader>

        {errors && <ErrorMessage errors={errors} />}

        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <RequiredFormLabel text="Название цели" />
            <Input 
              name="name"
              value={formData.name} 
              onChange={handleTextInputChange}
              placeholder="Введите название" 
            />
          </FormControl>

          <FormControl mb={4}>
            <RequiredFormLabel text="Цена ⭐️" />
            <NumberInput 
              value={formData.price} 
              onChange={handleNumberInputChange}
              min={0}
            >
              <NumberInputField name="price" placeholder="Введите цену" />
            </NumberInput>
          </FormControl>

          <FormControl>
            <FormLabel>Ссылка на изображение</FormLabel>
            <Input 
              name="image"
              value={formData.image} 
              onChange={handleTextInputChange} 
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
            isDisabled={!formData.name.trim() || formData.price <= 0}
          >
            Добавить
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddRewardForm;