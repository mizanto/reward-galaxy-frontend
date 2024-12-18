import apiClient from './apiClient';

export const getFamilyMembers = async () => {
  const response = await apiClient.get('/family/members');
  return response.data;
};

export const addFamilyMember = async (memberData) => {
  console.debug('Adding family member:', memberData);
  const response = await apiClient.post('/family/members', memberData);
  return response.data;
};

export const deleteFamilyMember = async (memberId) => {
  console.debug('Deleting family member with ID:', memberId);
  const response = await apiClient.delete(`/family/members/${memberId}`);
  return response.data;
};
