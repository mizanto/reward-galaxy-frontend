import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Heading, FormControl, Input, Button, Text } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';

import { login } from '../redux/userSlice';
import { registerFamily, loginUser } from '../api/authService';
import { validateRegisterForm } from '../utils/validation';
import { parseRegisterError } from '../utils/parser';
import RequiredFormLabel from '../components/Common/RequiredFormLabel'
import ErrorMessage from '../components/Common/ErrorMessage';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName]   = useState('');
  const [familyName, setFamilyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const formErrors = validateRegisterForm({
      name,
      familyName,
      email,
      password,
      confirmPassword,
    });

    if (formErrors.length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const registerData = { email, name, family_name: familyName, password };
      console.debug('Registering user:', registerData);

      const newUser = await registerFamily(registerData);
      console.debug('Registration successful:', newUser);

      const loginResponse = await loginUser({ email, password });
      console.debug('Login successful:', loginResponse);

      dispatch(login(newUser));
      navigate('/');
    } catch (e) {
      console.error('Registration failed:', e.response?.data || e.message);
      
      if (e.response?.data?.detail) {
        const errorMessages = parseRegisterError(e);
        setErrors(errorMessages);
      } else {
        setErrors('Ошибка регистрации');
      }
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth="1px" borderRadius="lg">
      <Heading mb={6}>Регистрация</Heading>

      {errors && <ErrorMessage errors={errors} />}

      <form onSubmit={handleSubmit}>
      <FormControl mb={4}>
        <RequiredFormLabel text="Имя" />
        <Input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите имя"
        />
      </FormControl>

      <FormControl mb={4}>
        <RequiredFormLabel text="Название семьи" />
        <Input 
          type="text" 
          value={familyName}
          onChange={(e) => setFamilyName(e.target.value)}
          placeholder="Название семьи"
        />
      </FormControl>

      <FormControl mb={4}>
        <RequiredFormLabel text="Email" />
        <Input 
          type="email"
          value={email}
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
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Введите пароль"
          autoComplete="new-password"
        />
      </FormControl>

      <FormControl mb={4}>
        <RequiredFormLabel text="Подтвердите пароль" />
        <Input 
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Повторите пароль"
          autoComplete="new-password"
        />
      </FormControl>

      <Button colorScheme="teal" width="100%" onClick={handleSubmit}>Зарегистрироваться</Button>
      <Text mt={4} fontSize="sm" color="gray.500">
        Уже есть аккаунт? <a href="/login" style={{color:'teal'}}>Войти</a>
      </Text>
      </form>
    </Box>
  );
};

export default Register;