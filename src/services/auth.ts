import apiClient from './axios';

export interface LogInBody {
  email: string;
  password: string;
}

export interface UpdateUserBody {
  name: string;
  gender: string;
  birthday: string;
}

export interface SignUpBody {
  name: string;
  email: string;
  gender: string;
  birthday: string;
  password: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  gender: string;
  birthday: string;
  password: string;
  token: string;
}

const logIn = (body: LogInBody) => {
  return apiClient.post<User>('/auth/login', body);
};

const signUp = (body: SignUpBody) => {
  return apiClient.post<User>('/auth/sign-up', body);
};

const me = () => {
  return apiClient.get<User>('/auth/me');
};

const updateMe = (body: UpdateUserBody) => {
  return apiClient.post<User>('/auth/me', body);
};

export { logIn, me, signUp, updateMe };
