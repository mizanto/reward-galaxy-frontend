import React, { useState } from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Button, Text } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/authSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    // Mock login, replace with your actual login logic
    const mockUser = {
      id: 1,
      role: 'parent', // или 'child'
      name: 'Иван',
      balance: 10
    };

    dispatch(login(mockUser));
    navigate('/');
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth="1px" borderRadius="lg">
      <Heading mb={6}>Вход</Heading>
      <FormControl mb={4}>
        <FormLabel>Email</FormLabel>
        <Input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Введите email"
        />
      </FormControl>
      
      <FormControl mb={4}>
        <FormLabel>Пароль</FormLabel>
        <Input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Введите пароль"
        />
      </FormControl>

      <Button colorScheme="teal" width="100%" onClick={handleSubmit}>Войти</Button>
      <Text mt={4} fontSize="sm" color="gray.500">
        Нет аккаунта? <a href="/register" style={{color:'teal'}}>Зарегистрироваться</a>
      </Text>
    </Box>
  );
};

export default LoginPage;