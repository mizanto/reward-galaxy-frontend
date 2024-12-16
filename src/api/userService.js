import apiClient from './apiClient';

export const getCurrentUser = async () => {
  const response = await apiClient.get('/me');
  return response.data;
};