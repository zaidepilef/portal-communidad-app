export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  confirmpassword: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  user?: {
    id: number;
    username: string;
    email: string;
  };
}
