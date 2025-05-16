/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private authService: AuthService) { }

	intercept(req: HttpRequest<any>, next: HttpHandler) {
		const token = this.authService.getToken(); // Obtener el token JWT

		if (token) {
			req = req.clone({
				setHeaders: {
					Authorization: `Bearer ${token}` // Agregar el token al header
				}
			});
		}

		return next.handle(req); // Continuar con la solicitud
	}
}
