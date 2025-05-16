/* eslint-disable @typescript-eslint/no-explicit-any */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { inject, Injectable, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import { SpinnerService } from '../theme/shared/components/spinner/spinner.service';
import { Community } from '../models/community-model';

@Injectable({
	providedIn: 'root' // ✅ Esto asegura que Angular inyecte el servicio globalmente
})

export class CommunitiesService implements OnDestroy {

	private authService = inject(AuthService);
	private apiUrl = environment.apiUrl; // Usa la URL de la API desde environment.ts
	private destroy$ = new Subject<void>(); // 👈 Se usará para cerrar conexiones
	private spinnerService = inject(SpinnerService);

	constructor(private http: HttpClient) {
		//this.spinnerService.mostrarSpinner(); // ✅ Muestra el spinner antes de la petición

	}

	private getAuthHeaders(): HttpHeaders {
		return new HttpHeaders({
			Authorization: `Bearer ${this.authService.getToken()}`
		});
	}

	get(): Observable<any> {
		return this.http.get(`${this.apiUrl}/communities`, { headers: this.getAuthHeaders() });
	}

	update(id: number, data: any): Observable<any> {
		return this.http.put(`${this.apiUrl}/communities/${id}`, data, { headers: this.getAuthHeaders() });
	}

	getById(id: number) {
		return this.http.get(`${this.apiUrl}/communities/${id}`, { headers: this.getAuthHeaders() });
	}

	create(data: Community) {
		return this.http.post(`${this.apiUrl}/communities`, data, {
			headers: this.getAuthHeaders()
		});
	}


	ngOnDestroy(): void {

		this.destroy$.next(); // 👈 Notifica a las suscripciones que se deben cancelar
		this.destroy$.complete();

	}

}
