export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  confirmpassword: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  token: string;
}
