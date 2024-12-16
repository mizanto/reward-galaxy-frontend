import React, { useState } from 'react';
import { Box, Heading, FormControl, Input, Button, Text } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import { loginUser } from '../api/authService';
import { getCurrentUser } from '../api/userService';
import { login } from '../redux/userSlice';
import { validateLoginForm } from '../utils/validation';
import { parseLoginError } from '../utils/parser';
import RequiredFormLabel from '../components/Common/RequiredFormLabel'
import ErrorMessage from '../components/Common/ErrorMessage';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async() => {
    setIsLoading(true);
    setErrors([]);

    const formErrors = validateLoginForm({ email, password });
    if (formErrors.length > 0) {
      setIsLoading(false);
      setErrors(formErrors);
      return;
    }

    try {
      const response = await loginUser({ email, password });
      console.debug('Login successful:', response);

      const currentUser = await getCurrentUser();
      console.debug('User data:', currentUser);

      dispatch(login(currentUser));
      navigate('/');
    } catch (e) {
      console.error('Login failed:', e.response?.data || e.message);

      if (e.response?.data?.detail) {
        const errorMessages = parseLoginError(e);
        setErrors(errorMessages);
      } else {
        setErrors(['Ошибка входа. Пожалуйста, попробуйте снова.']);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth="1px" borderRadius="lg">
      <Heading mb={6}>Вход</Heading>

      {errors && <ErrorMessage errors={errors} />}
      
      <FormControl mb={4}>
        <RequiredFormLabel text="Email" />
        <Input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Введите email"
        />
      </FormControl>
      
      <FormControl mb={4}>
        <RequiredFormLabel text="Пароль" />
        <Input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Введите пароль"
        />
      </FormControl>

      <Button 
        colorScheme="teal" 
        width="100%" 
        onClick={handleSubmit}
        isLoading={isLoading}
      >
        Войти
      </Button>
      <Text mt={4} fontSize="sm" color="gray.500">
        Нет аккаунта? <Link to="/register" style={{ color: 'teal' }}>Зарегистрироваться</Link>
      </Text>
    </Box>
  );
};

export default LoginPage;