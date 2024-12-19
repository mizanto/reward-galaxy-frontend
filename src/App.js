import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Spinner, Center } from '@chakra-ui/react';

import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import { restoreUserFromToken } from './redux/userSlice';
import ProtectedRoute from './components/ProtectedRout/ProtectedRoute';

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);

  useEffect(() => {
    dispatch(restoreUserFromToken());
  }, [dispatch]);

  if (loading) {
    return (
      <Center h="100vh" w="100vw">
        <Spinner size="xl" color="teal.500" />
      </Center>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Layout>
              <HomePage />
            </Layout>
          </ProtectedRoute>
          } 
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
