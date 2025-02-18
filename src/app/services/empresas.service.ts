/* eslint-disable @typescript-eslint/no-explicit-any */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { inject, Injectable, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root' // ✅ Esto asegura que Angular inyecte el servicio globalmente
})

export class EmpresasService implements OnDestroy {

	private authService = inject(AuthService);
	private apiUrl = environment.apiUrl; // Usa la URL de la API desde environment.ts
	private destroy$ = new Subject<void>(); // 👈 Se usará para cerrar conexiones

	constructor(private http: HttpClient) { }

	obtenerEmpresas(): Observable<any> {

		const headers = new HttpHeaders({
			Authorization: `Bearer ${this.authService.getToken()}`
		});

		return this.http.get(`${this.apiUrl}/empresas`, { headers });
	}

	ngOnDestroy(): void {

		this.destroy$.next(); // 👈 Notifica a las suscripciones que se deben cancelar
		this.destroy$.complete();

	}

}
