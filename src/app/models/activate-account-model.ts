export interface ActivateRequest {
	token: string;
	email: string;
	code: string;
}

export interface ActivateResponse {
  success: boolean;
  message?: string;
  accessToken?: string;
}
