import apiClient from './apiClient';

export const getRewards = async () => {
  const response = await apiClient.get('/rewards');
  return response.data;
};