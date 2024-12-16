import React from 'react';
import { Text } from '@chakra-ui/react';

const ErrorMessage = ({ errors }) => {
  if (!errors || errors.length === 0) return null;

  return (
    <Text color="red.500" mb={4}>
      {Array.isArray(errors) ? (
        errors.map((msg, index) => (
          <React.Fragment key={index}>
            {msg}
            <br />
          </React.Fragment>
        ))
      ) : (
        errors
      )}
    </Text>
  );
};

export default ErrorMessage;