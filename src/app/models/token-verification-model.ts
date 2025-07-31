export interface TokenVerificationResponse {
  status: string;
  message: string;
  token_person?: string;
  user?: {
    username: string;
    email: string;
  };
}

export interface AuthorizationResponse {
  success: boolean;
  message?: string;
  accessToken?: string;
}
