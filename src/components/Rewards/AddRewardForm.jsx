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

  const handleChange = (e) => {
    if (typeof e === 'string' || typeof e === 'number') {
      console.debug('handleChange', 'price', e);
      setFormData((prev) => ({ ...prev, price: e }));
    } else {
      const { name, value } = e.target;
      console.debug('handleChange', name, value);
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    const formErrors = validateAddRewardForm(formData);
    if (formErrors.length > 0) {
      setErrors(formErrors);
      return;
    }
    onSubmit(formData);
    onSubmit(formData);
    setFormData({ name: '', price: '', image: '' });
    handleClose();
  };

  const handleClose = () => {
    setFormData({ name: '', email: '', role: 'child', password: '' });
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
              onChange={handleChange}
              placeholder="Введите название" 
            />
          </FormControl>

          <FormControl mb={4}>
            <RequiredFormLabel text="Цена ⭐️" />
            <NumberInput 
              value={formData.price} 
              onChange={(value) => handleChange(value)}
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
              onChange={handleChange} 
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