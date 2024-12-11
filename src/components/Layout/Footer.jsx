import React from 'react';
import { Box, Text, Link as ChakraLink } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box as="footer" bg="gray.100" p={4}>
      <Text fontSize="sm" color="gray.600" textAlign="center">
        © {new Date().getFullYear()} Reward Galaxy. All rights reserved. 
        {/* TODO: add privacy policy */}
        {" "}
        <ChakraLink color="teal.500" href="/privacy-policy">
          Privacy Policy
        </ChakraLink>
      </Text>
    </Box>
  );
};

export default Footer;