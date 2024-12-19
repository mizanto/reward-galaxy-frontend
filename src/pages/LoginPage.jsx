import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Heading, FormControl, Input, Button, Text } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link, Navigate } from 'react-router-dom';

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

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  console.debug('isAuthenticated:', isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <RequiredFormLabel text="Email" />
          <Input 
            type="email" 
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Введите email"
            autoComplete="username"
          />
        </FormControl>
        
        <FormControl mb={4}>
          <RequiredFormLabel text="Пароль" />
          <Input 
            type="password" 
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
            autoComplete="current-password"
          />
        </FormControl>

        <Button 
          colorScheme="teal" 
          width="100%" 
          type="submit"
          isLoading={isLoading}
        >
          Войти
        </Button>
      </form>

      <Text mt={4} fontSize="sm" color="gray.500">
        Нет аккаунта? <Link to="/register" style={{ color: 'teal' }}>Зарегистрироваться</Link>
      </Text>
    </Box>
  );
};

export default LoginPage;