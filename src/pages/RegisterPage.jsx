import React, { useState } from 'react';
import { Box, Heading, FormControl, Input, Button, Text } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { login } from '../redux/userSlice';
import { registerFamily } from '../api/authService';
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

  const handleSubmit = async () => {
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

      const response = await registerFamily(registerData);
      console.debug('Registration successful:', response);

      dispatch(login(response.data));
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

      <FormControl mb={4}>
        <RequiredFormLabel text="Подтвердите пароль" />
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