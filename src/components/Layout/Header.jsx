import React from 'react';
import { Box, Flex, Spacer, Button, Link as ChakraLink } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Header = () => {
  const isAuthenticated = true; // TODO: replace with actual authentication state

  // Logout handler
  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Logout clicked');
  };

  return (
  <Box as="header" bg="teal.500" p={4} color="white">
    <Flex alignItems="center">
      <ChakraLink as={Link} to="/" fontSize="lg" fontWeight="bold">
        Reward Galaxy
      </ChakraLink>
      <Spacer />
      
      <Flex gap={4}>
        {!isAuthenticated ? (
          <>
            <ChakraLink as={Link} to="/login">Login</ChakraLink>
            <ChakraLink as={Link} to="/register">Register</ChakraLink>
          </>
        ) : (
          <Button 
            onClick={handleLogout}
            bg="teal.500" 
            color="white"
            _hover={{ bg: "teal.600" }}
          >
              Logout
          </Button>
        )}
      </Flex>
    </Flex>
  </Box>
  );
};

export default Header;