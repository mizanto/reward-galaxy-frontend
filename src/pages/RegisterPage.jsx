import React, { useState } from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Button, Text } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/userSlice';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [name, setName]   = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      alert('Пароли не совпадают!');
      return;
    }

    // Mock registration, replace with actual registration logic (e.g., API call)
    const mockUser = {
      id: Date.now(),
      role: 'parent', 
      name: name,
      balance: 10
    };

    dispatch(login(mockUser));
    navigate('/');
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth="1px" borderRadius="lg">
      <Heading mb={6}>Регистрация</Heading>
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
        <FormLabel>Имя</FormLabel>
        <Input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите имя"
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

      <FormControl mb={4}>
        <FormLabel>Подтвердите пароль</FormLabel>
        <Input 
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Повторите пароль"
        />
      </FormControl>

      <Button colorScheme="teal" width="100%" onClick={handleSubmit}>Зарегистрироваться</Button>
      <Text mt={4} fontSize="sm" color="gray.500">
        Уже есть аккаунт? <a href="/login" style={{color:'teal'}}>Войти</a>
      </Text>
    </Box>
  );
};

export default Register;