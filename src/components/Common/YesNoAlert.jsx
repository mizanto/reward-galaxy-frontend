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
  } from '@chakra-ui/react';

  const YesNoAlert = ({ isOpen, onClose, title, message, type, onYes, onNo }) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>{message}</FormLabel>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme={ type === "destructive" ? "red" : "teal"} mr={3} onClick={onYes}>
              Да
            </Button>
            <Button variant="ghost" onClick={onNo ? onNo : onClose}>
              Нет
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  export default YesNoAlert;