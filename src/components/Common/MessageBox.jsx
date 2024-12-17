import { Alert, AlertIcon, CloseButton } from '@chakra-ui/react';

const MessageBox = ({ message, type="info", onClose }) => (
  <Alert status={type} mb={4}>
    <AlertIcon />
    {message}
    <CloseButton position="absolute" right="8px" top="8px" onClick={onClose} />
  </Alert>
);

export default MessageBox;