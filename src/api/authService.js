import apiClient from './apiClient';

export const registerFamily = async (registerData) => {
  const response = await apiClient.post('auth/register/family', registerData);
  return response.data;
};

export const loginUser = async (loginData) => {
  const response = await apiClient.post('auth/login', loginData);
  
  // Save the access token to localStorage
  const { access_token } = response.data;
  if (access_token) {
    localStorage.setItem('accessToken', access_token);
  }
  
  return response.data;
};