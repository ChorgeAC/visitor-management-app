import axiosInstance from '../lib/axios';

export const loginUser = async (data: { email: string; password: string }) => {
  const res = await axiosInstance.post('/api/auth/login', data);

  const { token } = res.data;

  if (token) {
    localStorage.setItem('token', token);
  }

  return res.data; // { token, role, user }
};

export const registerUser = async (data: { email: string; password: string }) => {
  const res = await axiosInstance.post('/api/auth/register', data);

  const { token } = res.data;

  if (token) {
    localStorage.setItem('token', token);
  }

  return res.data; // { token, role, user }
};