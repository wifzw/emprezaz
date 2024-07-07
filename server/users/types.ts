export interface IUserResponse {
  id: string;
  name: string;
  cpf: string;
  phone: string;
  birth_date: string;
  avatar: string | null;
  email: string;
  status: boolean
  created_at: Date | string;
  updated_at: Date | string;
}

export interface ICreateUserPayload {
  name: string;
  cpf: string;
  phone: string;
  birth_date: string;
  avatar: string | null;
  email: string;
  status: boolean
}

export interface IUpdateUserPayload extends Partial<IUserResponse> { }