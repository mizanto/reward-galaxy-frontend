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
  Input
} from '@chakra-ui/react';

const TopupForm = ({ isOpen, onClose, onSubmit }) => {
  const [amount, setAmount] = useState(0);
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    onSubmit({ amount, reason });
    setAmount(0);
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
          <FormControl mb={4}>
            <FormLabel>Сумма</FormLabel>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
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
          <Button colorScheme="blue" onClick={handleSubmit} ml={3}>
            Добавить
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
};

export default TopupForm;