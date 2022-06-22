export type LoginForm = {
  username: string;
  password: string;
};
export type LoginResponse = {
  authProvider: string;
  avatar: string;
  birthdate: string;
  firstname: string;
  id: number;
  lastname: string;
  roles: Role[];
  teams: Team[];
  username: string;
};

export type Role = {
  id: number;
  name: string;
};

export type Team = {
  id: number;
  name: string;
  description: string;
};

export type UserRegistrationModel = {
  firstname: string;
  lastname: string;
  username: string;
  birthday: string;
  password: string;
  country: string;
  phonenumber: string;
  role: string;
};