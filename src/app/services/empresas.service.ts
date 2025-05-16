/* eslint-disable @typescript-eslint/no-explicit-any */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { inject, Injectable, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import { SpinnerService } from '../theme/shared/components/spinner/spinner.service';
import { Enterprise } from '../models/enterprise-model';

@Injectable({
	providedIn: 'root'
})
export class EnterprisesService implements OnDestroy {

	private authService = inject(AuthService);
	private spinnerService = inject(SpinnerService);
	private apiUrl = environment.apiUrl;
	private destroy$ = new Subject<void>();

	constructor(private http: HttpClient) { }

	private getAuthHeaders(): HttpHeaders {
		return new HttpHeaders({
			Authorization: `Bearer ${this.authService.getToken()}`
		});
	}

	get(): Observable<Enterprise[]> {
		return this.http.get<Enterprise[]>(`${this.apiUrl}/enterprises`, { headers: this.getAuthHeaders() });
	}

	getById(id: number): Observable<Enterprise> {
		return this.http.get<Enterprise>(`${this.apiUrl}/enterprises/${id}`, { headers: this.getAuthHeaders() });
	}

	update(id: number, data: Partial<Enterprise>): Observable<Enterprise> {
		return this.http.put<Enterprise>(`${this.apiUrl}/enterprises/${id}`, data, { headers: this.getAuthHeaders() });
	}

	create(data: Partial<Enterprise>) {
		return this.http.post<Enterprise>(`${this.apiUrl}/enterprises`, data, { headers: this.getAuthHeaders() });
	}


	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}

