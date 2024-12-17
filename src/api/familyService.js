import apiClient from './apiClient';

export const getFamilyMembers = async () => {
  const response = await apiClient.get('/family/members');
  return response.data;
};
