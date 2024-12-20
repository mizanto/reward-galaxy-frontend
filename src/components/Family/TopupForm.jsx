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
} from '@chakra-ui/react';

import RequiredFormLabel from '../Common/RequiredFormLabel'
import { validateTopupForm } from '../../utils/validation';
import ErrorMessage from '../Common/ErrorMessage';

const TopupForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
      amount: '',
      reason: '',
    });
  const [errors, setErrors] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const formErrors = validateTopupForm(formData);
    if (formErrors.length > 0) {
      setErrors(formErrors);
      return;
    }
    onSubmit(formData);
    handleClose();
  };

  const handleClose = () => {
    setErrors('');
    setFormData({ name: '', email: '', role: 'child', password: '' });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        {/* Modal Header */}
        <ModalHeader>Пополнить баланс</ModalHeader>

        {/* Errors */}  
        {errors && <ErrorMessage errors={errors} />}

        {/* Modal Close Button */}
        <ModalCloseButton />

        {/* Topup Form */}
        <ModalBody>
          <FormControl mb={4}>
            <RequiredFormLabel text="Сумма" />
            <Input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange} 
              placeholder="Введите сумму"
            />
          </FormControl>
          <FormControl mb={4}>
            <RequiredFormLabel text="Причина" />
            <Input
              value={formData.reason}
              name="reason"
              onChange={handleChange} 
              placeholder="Введите причину"
            />
          </FormControl>
        </ModalBody>

        {/* Buttons */}
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>Отмена</Button>
          <Button 
            colorScheme="teal" 
            onClick={handleSubmit} 
            isDisabled={!formData.amount.trim() || !formData.reason.trim()}
            ml={3}
          >
            Добавить
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
};

export default TopupForm;