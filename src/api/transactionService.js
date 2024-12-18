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