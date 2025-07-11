import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { AutorizacionService } from '../../services/autorizacion.service';
import { TokenVerificationResponse } from '../../models/token-verification-model';

@Component({
	selector: 'app-autorizar',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './autorizar.component.html',
	styleUrl: './autorizar.component.scss'
})
export class AutorizarComponent implements OnInit {
	token: string = '';
	tokenPerson: string = '';
	isLoading = true;
	mensaje = 'Verificando autorización...';
	error = false;
	success = false;
	userInfo: TokenVerificationResponse['user'] | null = null; // Información del usuario

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private authService: AuthService,
		private autorizacionService: AutorizacionService
	) { }

	ngOnInit() {
		// Obtener el token del parámetro de ruta
		this.token = this.route.snapshot.paramMap.get('token') || '';

		if (!this.token || this.token.trim() === '') {
			this.mensaje = 'Token de autorización no válido o faltante';
			this.error = true;
			this.isLoading = false;
			return;
		}

		// Verificar el token con el backend
		this.verificarToken();
	}

	verificarToken() {
		// Verificar el token con el backend
		this.autorizacionService.verificarToken(this.token).subscribe({
			next: (response) => {
				console.log('Respuesta de verificación:', response);

				if (response && response.status === 'success' && response.token_person) {

					this.tokenPerson = response.token_person;
					// Guardar información del usuario
					this.userInfo = response.user;

					// Mostrar mensaje con información del usuario
					if (this.userInfo) {
						this.mensaje = `Autorizando acceso para ${this.userInfo.username}...`;
					}

					// Token válido - proceder a autorizar acceso
					this.activarCuenta();
				} else {
					// Token inválido
					this.mensaje = response?.message || 'Token de autorización inválido o expirado';
					this.error = true;
					this.isLoading = false;
				}
			},
			error: (err) => {
				console.error('Error verificando token:', err);

				// Manejar diferentes tipos de errores
				if (err.status === 401) {
					this.mensaje = 'Token de autorización inválido';
				} else if (err.status === 404) {
					this.mensaje = 'Token de autorización no encontrado';
				} else if (err.status === 0) {
					this.mensaje = 'Error de conexión. Verifique su internet.';
				} else {
					this.mensaje = err.error?.message || 'Error al verificar el token de autorización';
				}

				this.error = true;
				this.isLoading = false;
			}
		});
	}


	// ir a activar cuenta y enviar token_person y userInfo mediante localstorage
	activarCuenta() {
		localStorage.setItem('token_person', this.tokenPerson);
		localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
		// que demore unos segundos con un spinner
		this.isLoading = true;
		setTimeout(() => {
			this.isLoading = false;
			this.router.navigate(['/auth/activacion']);
		}, 8000);
	}



	reintentar() {
		this.isLoading = true;
		this.error = false;
		this.success = false;
		this.mensaje = 'Reintentando verificación...';
		this.verificarToken();
	}
}
