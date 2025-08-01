import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ActivateAccountRequest, ActivateAccountResponse } from '../models/activate-account-model';

@Injectable({
	providedIn: 'root'
})
export class ActivateAccountService {

	private apiUrl = environment.apiUrl;

	constructor(private http: HttpClient) { }

	/**
	 * Verifica un token de autorización
	 *
	 */
	activateAccount(account: ActivateAccountRequest): Observable<ActivateAccountResponse> {
		return this.http.post<ActivateAccountResponse>(`${this.apiUrl}/activate-account`,  account );
	}


}
