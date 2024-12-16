import { Box, FormLabel } from '@chakra-ui/react';

const RequiredFormLabel = ({ text }) => {
  return (
    <FormLabel>
      {text} <Box as="span" color="red.500">*</Box>
    </FormLabel>
  );
};

export default RequiredFormLabel;