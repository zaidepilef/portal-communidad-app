import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TokenVerificationResponse } from '../../models/token-verification-model';

@Component({
	selector: 'app-activacion',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: './activacion.component.html',
	styleUrl: './activacion.component.scss'
})
export class ActivacionComponent implements OnInit {
	token: string = '';
	tokenPerson: string = ''; // Token que devuelve la validación
	isLoading = true;
	mensaje = 'Validando token de activación...';
	error = false;
	success = false;
	tokenInfo = '';
	showForm = false; // Controla si mostrar el formulario
	userDataForm: FormGroup; // Formulario para datos del usuario
	userInfo: TokenVerificationResponse['user'] | null = null; // Información del usuario

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private authService: AuthService,
		private fb: FormBuilder
	) {
		// Inicializar formulario con validaciones
		this.userDataForm = this.fb.group({
			nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
			apellido: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
			cedula: ['', [Validators.required, Validators.pattern(/^\d{8,10}$/)]], // 8-10 dígitos
		});
	}

	ngOnInit() {
		// obtener localstorage de token_person
		this.tokenPerson = localStorage.getItem('token_person') || '';
		this.userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

		// Validar que el token no esté vacío
		if (!this.tokenPerson || this.tokenPerson.trim() === '') {
			this.mensaje = 'Token de activación no válido o faltante';
			this.error = true;
			this.isLoading = false;
			return;
		}

		if (this.tokenPerson && this.userInfo) {

			this.isLoading = false;
			this.mensaje = 'Complete sus datos para activar la cuenta.';

		}
	}


	onSubmitForm() {
		if (this.userDataForm.invalid) return;

		this.isLoading = true;
		this.mensaje = 'Activando cuenta...';

		// Preparar datos para enviar al endpoint de activación
		// El token_person es específico solo para este endpoint
		const activationData = {
			token_person: this.tokenPerson, // Token específico para activación
			nombre: this.userDataForm.value.nombre,
			apellido: this.userDataForm.value.apellido,
			type_doc: 'RUN',
			cod_doc: this.userDataForm.value.cedula,
		};

		// Llamar al endpoint de activación con los datos del usuario
		this.authService.activateAccount(activationData).subscribe({
			next: (response) => {
				// Verificar si la respuesta tiene la estructura esperada
				if (response && response.success === true) {
					this.mensaje = response.message || '¡Cuenta activada exitosamente! Redirigiendo al login...';
					this.success = true;
					this.isLoading = false;

					// Redirigir al login después de 3 segundos
					setTimeout(() => {
						this.router.navigate(['/auth/login']);
					}, 3000);
				} else {
					this.mensaje = response?.message || 'Error al activar la cuenta';
					this.error = true;
					this.isLoading = false;
				}
			},
			error: (err) => {
				console.error('Error activando cuenta:', err);

				// Manejar diferentes tipos de errores
				if (err.status === 404) {
					this.mensaje = 'Token de activación no encontrado';
				} else if (err.status === 400) {
					this.mensaje = 'Token de activación inválido o ya utilizado';
				} else if (err.status === 0) {
					this.mensaje = 'Error de conexión. Verifique su internet.';
				} else {
					this.mensaje = err.error?.message || 'Error al activar la cuenta';
				}

				this.error = true;
				this.isLoading = false;
			}
		});
	}

	irAlLogin() {
		this.router.navigate(['/auth/login']);
	}


}
