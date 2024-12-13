import React, { useState } from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Button, Text } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/userSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    const mockUser = { id: 1, name: 'Иван', email: 'ivan@mail.com', role: 'parent' };
    // const mockUser = { id: 3, name: 'Дима', email: 'dima@mail.com', role: 'child', balance: 30 };
    // const mockUser = { id: 4, name: 'Аня', email: 'anya@mail.com', role: 'child', balance: 5 };

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