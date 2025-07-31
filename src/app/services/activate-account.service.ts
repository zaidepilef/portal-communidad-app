import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ActivateRequest, ActivateResponse } from '../models/activate-account-model';

@Injectable({
	providedIn: 'root'
})
export class ActivateAccountService {

	private apiUrl = environment.apiUrl;

	constructor(private http: HttpClient) { }

	/**
	 * Verifica un token de autorización
	 * @param token Token a verificar
	 * @returns Observable con la respuesta del servidor
	 */
	activateAccount(account: ActivateRequest): Observable<ActivateResponse> {
		return this.http.post<ActivateResponse>(`${this.apiUrl}/activate-account`,  account );
	}


}
