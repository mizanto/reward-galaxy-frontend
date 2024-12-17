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
  Input,
  Select,
} from '@chakra-ui/react';

import RequiredFormLabel from '../Common/RequiredFormLabel'
import { validateAddMemberForm } from '../../utils/validation';
import ErrorMessage from '../Common/ErrorMessage';

const AddMemberForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'child',
    password: ''
  });
  const [errors, setErrors] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const formErrors = validateAddMemberForm(formData);
    
    if (formErrors.length > 0) {
      setErrors(formErrors);
      return;
    }

    onSubmit(formData);
    onClose();
  };

  const handleClose = () => {
    setFormData({ name: '', email: '', role: 'child', password: '' });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Добавить члена семьи</ModalHeader>

        {errors && <ErrorMessage errors={errors} />}

        <ModalCloseButton />

        <ModalBody>
          <FormControl mb={4}>
            <RequiredFormLabel text="Имя" />
            <Input 
              name="name"
              value={formData.name}
              onChange={handleChange} 
              placeholder="Введите имя" 
            />
          </FormControl>

          <FormControl mb={4}>
            <RequiredFormLabel text="Роль" />
            <Select name="role" value={formData.role} onChange={handleChange}>
              <option value="parent">Родитель</option>
              <option value="child">Ребенок</option>
            </Select>
          </FormControl>

          <FormControl mb={4}>
            <RequiredFormLabel text="Email" />
            <Input 
              name="email"
              value={formData.email}
              onChange={handleChange} 
              placeholder="Введите e-mail" 
            />
          </FormControl>

          <FormControl>
            <RequiredFormLabel text="Пароль" />
            <Input 
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange} 
              placeholder="Введите пароль" 
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={handleClose}>Отмена</Button>
          <Button 
            colorScheme="teal" 
            onClick={handleSubmit} 
            ml={3} 
            isDisabled={!formData.name.trim() || !formData.email.trim() || !formData.password.trim()} 
          >
            Добавить
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddMemberForm;