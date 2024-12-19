import apiClient from './apiClient';

export const topUpBalance = async (to, amount, reason) => {
  const requestData = {
    type: 'transfer',
    recipient_id: to,
    amount: amount,
    reason: reason,
  };
  const response = await apiClient.post('/transactions', requestData);
  return response.data;
};

export const purchase = async (reward) => {
  const requestData = {
    type: 'purchase',
    reward_id: reward.id,
    amount: reward.price,
    reason: `Покупка награды: ${reward.name}`,
  };
  const response = await apiClient.post('/transactions', requestData);
  return response.data;
};