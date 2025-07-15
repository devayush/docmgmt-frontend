// src/api/auth.ts
import axios from '../lib/axios';

interface LoginPayload {
  email: string;
  password: string;
}

interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    email: string;
    name: string;
    role: string;
  };
}

export const loginApi = async (data: LoginPayload): Promise<AuthResponse> => {
  const response = await axios.post('/auth/login', data, { withCredentials: true });
  return response.data;
};

export const signupApi = async (data: SignupPayload): Promise<AuthResponse> => {
  const response = await axios.post('/auth/register', data);
  return response.data;
};

export const fetchProfile = async () => {
  const response = await axios.get('/auth/profile');
  return response.data; // should return { id, name, email }
};