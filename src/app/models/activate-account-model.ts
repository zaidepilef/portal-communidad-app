export interface ActivateAccountRequest {
	token: string;
	email: string;
	code: string;
}

export interface ActivateAccountResponse {
  message?: string;
  access_token?: string;
}
