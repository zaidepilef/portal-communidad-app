/* eslint-disable @typescript-eslint/no-explicit-any */

import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Injectable, OnDestroy } from '@angular/core';

@Injectable({
	providedIn: 'root' // ✅ Esto asegura que Angular inyecte el servicio globalmente
})
export class AuthService implements OnDestroy {

	private apiUrl = environment.apiUrl; // Usa la URL de la API desde environment.ts
	private destroy$ = new Subject<void>(); // 👈 Se usará para cerrar conexiones
	constructor(private http: HttpClient, private router: Router) { }

	// Iniciar sesión
	login(credentials: { email: string; password: string }): Observable<any> {
		return this.http.post(`${this.apiUrl}/login`, credentials);
	}

	// Registrar usuario
	register(credentials: {
		username: string;
		email: string;
		password: string;
		confirmpassword: string;
	}): Observable<any> {
		return this.http.post(`${this.apiUrl}/register`, credentials);
	}

	// Recuperar contraseña
	recovery(credentials: { email: string; }): Observable<any> {
		return this.http.post(`${this.apiUrl}/recovery`, credentials);
	}

	// Validar token de activación
	validateActivationToken(token: string): Observable<any> {
		return this.http.post(`${this.apiUrl}/activation/validate`, { token });
	}

	// Activar cuenta
	activateAccount(userData: {
		nombre: string;
		apellido: string;
		tipoDocumento: string;
		cedula: string;
		token_person: string;
	}): Observable<any> {
		return this.http.post(`${this.apiUrl}/activation/activate`, userData);
	}


	// Guardar el token y la expiración en LocalStorage
	saveToken(response: any): void {
		localStorage.setItem('access_token', response.token);
	}

	// Obtener el token
	getToken(): string | null {
		return localStorage.getItem('access_token');
	}


	isAuthenticated(): boolean {
		return !!localStorage.getItem('access_token');
	}


	// Verificar si el usuario está autenticado
	_isAuthenticated(): boolean {

		const token = this.getToken();
		const expiration = localStorage.getItem('token_expires_at');

		if (!token || !expiration) {
			return false;
		}

		// Verificar si el token ha expirado
		const now = new Date().getTime();

		return now < parseInt(expiration, 10);
	}

	// Cerrar sesión
	logout(): void {
		localStorage.removeItem('access_token');
		localStorage.removeItem('token_expires_at');
		this.router.navigate(['/auth']); // Redirigir a login
	}

	ngOnDestroy(): void {
		this.destroy$.next(); // 👈 Notifica a las suscripciones que se deben cancelar
		this.destroy$.complete();
	}

}
