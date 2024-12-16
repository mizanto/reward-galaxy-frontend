import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const registerFamily = async (registerData) => {
  const response = await axios.post(`${API_URL}/register/family`, registerData);
  return response.data;
};