/* eslint-disable @typescript-eslint/no-explicit-any */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { inject, Injectable, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import { SpinnerService } from '../theme/shared/components/spinner/spinner.service';
import { User } from '../models/user-model';

@Injectable({
	providedIn: 'root' // ✅ Esto asegura que Angular inyecte el servicio globalmente
})

export class UsersService implements OnDestroy {

	private authService = inject(AuthService);
	private apiUrl = environment.apiUrl; // Usa la URL de la API desde environment.ts
	private destroy$ = new Subject<void>(); // 👈 Se usará para cerrar conexiones
	private spinnerService = inject(SpinnerService);

	constructor(private http: HttpClient) {
		//this.spinnerService.mostrarSpinner(); // ✅ Muestra el spinner antes de la petición
	}

	private getAuthHeaders(): HttpHeaders { return new HttpHeaders({ Authorization: `Bearer ${this.authService.getToken()}` }); }


	get(): Observable<User[]> {
		return this.http.get<User[]>(`${this.apiUrl}/users`, { headers: this.getAuthHeaders() });
	}

	/**
	 * 	* Método para actualizar un usuario
	 * @param id
	 * @param data
	 * @returns
	 */
	update(id: number, data: any): Observable<any> {
		return this.http.put(`${this.apiUrl}/users/${id}`, data, { headers: this.getAuthHeaders() });
	}

	/**
	 * 	* Método para obtener un usuario por su ID
	 * @param id
	 * @returns
	 */
	getById(id: number): Observable<User> {
		return this.http.get<User>(`${this.apiUrl}/users/${id}`, { headers: this.getAuthHeaders() });
	}

	/**
	 * 	* Método para crear un nuevo usuario
	 * @param data
	 * @returns
	 */
	create(data: Partial<User>) {
		return this.http.post<User>(`${this.apiUrl}/users`, data, { headers: this.getAuthHeaders() });
	}

	ngOnDestroy(): void {
		this.destroy$.next(); // 👈 Notifica a las suscripciones que se deben cancelar
		this.destroy$.complete();
	}

}
