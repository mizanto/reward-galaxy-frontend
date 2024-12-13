import React from 'react';
import { Box, Flex, Spacer, Button, Link as ChakraLink } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../../redux/userSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  const handleLogout = () => {
    console.log('Logout clicked');
    dispatch(logout());
    navigate('/login');
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
            _hover={{ bg: "white", color: "red.500" }}
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