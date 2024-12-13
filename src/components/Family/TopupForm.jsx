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
  Text
} from '@chakra-ui/react';

const TopupForm = ({ isOpen, onClose, onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (amount <= 0 || !reason.trim()) {
      setError('Введите корректные данные');
      return;
    }
    onSubmit({ amount, reason });
    setAmount('');
    setReason('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        {/* Modal Header */}
        <ModalHeader>Пополнить баланс</ModalHeader>
        <ModalCloseButton />

        {/* Topup Form */}
        <ModalBody>
          {error && <Text color="red.500" mb={4}>{error}</Text>}
          <FormControl mb={4}>
            <FormLabel>Сумма</FormLabel>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Введите сумму"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Причина</FormLabel>
            <Input
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Введите причину"
            />
          </FormControl>
        </ModalBody>

        {/* Buttons */}
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>Отмена</Button>
          <Button 
            colorScheme="blue" 
            onClick={handleSubmit} 
            ml={3}
            isDisabled={amount === 0 || !reason.trim()}
          >
            Добавить
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
};

export default TopupForm;