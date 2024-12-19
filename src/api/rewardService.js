import apiClient from './apiClient';

export const getRewards = async () => {
  const response = await apiClient.get('/rewards');
  return response.data;
};

export const createReward = async (rewardData) => {
  console.debug('Creating reward:', rewardData);
  const response = await apiClient.post(
    '/rewards',
    {
      name: rewardData.name,
      price: rewardData.price,
      image_url: rewardData.image
    }
  );
  return response.data;
};

export const deleteReward = async (rewardId) => {
  const response = await apiClient.delete(`/rewards/${rewardId}`);
  return response.data;
};