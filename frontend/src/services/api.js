import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const fetchUsers = async () => {
  const response = await axios.get(`${API_URL}/test`);
  return response.data;
};

export const addUser = async (userInfo) => {
  const response = await axios.post(`${API_URL}/test`, userInfo);
  return response.data;
};