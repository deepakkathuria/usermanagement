import axios from 'axios';

const api = axios.create({
  baseURL: 'https://reqres.in/api',
});

export const authService = {
  login: (email: string, password: string) =>
    api.post('/login', { email, password }),
  register: (email: string, password: string) =>
    api.post('/register', { email, password }),
};

export const userService = {
  getUsers: () => api.get('/users'),
};
