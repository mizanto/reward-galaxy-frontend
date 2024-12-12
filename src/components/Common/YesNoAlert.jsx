import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    Flex,
  } from '@chakra-ui/react';

  const YesNoAlert = ({ isOpen, onClose, title, message, type="default", onYes, onNo=onClose }) => {
    const colorSchemeMap = {
      destructive: "red",
      default: "teal",
    };
    
    return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{message}</Text>
          </ModalBody>
          <ModalFooter>
            <Flex>
              <Button colorScheme={colorSchemeMap[type] || colorSchemeMap.default} mr={3} onClick={onYes}>
                Да
              </Button>
              <Button variant="ghost" onClick={onNo}>
                Нет
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  export default YesNoAlert;