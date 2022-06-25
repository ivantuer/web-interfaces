import apiClient from './axios';

export interface LogInBody {
  email: string;
  password: string;
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
  try{
    return apiClient.post<User>('/auth/login', body);
  }catch(err){
    console.log(err)
  }
};

const signUp = (body: SignUpBody) => {
  return apiClient.post<User>('/auth/sign-up', body);
};

export { logIn, signUp, };
