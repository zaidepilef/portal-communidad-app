import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-login',
	imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})

export class LoginComponent implements OnDestroy {

	private authService = inject(AuthService); // ✅ Inyección con `inject()`
	private subscription: Subscription | null = null;
	loginForm: FormGroup;
	errorMessage: string | null = null;
	successMessage: string | null = null;
	isLoading = false; // ✅ Variable para controlar el GIF de carga

	constructor(
		private fb: FormBuilder,
		private router: Router,
	) {
		this.loginForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required],
		});
	}

	onSubmit() {
		if (this.loginForm.invalid) return;

		this.isLoading = true; // ✅ Mostrar GIF de carga
		this.errorMessage = null;
		this.successMessage = null;

		const credentials = this.loginForm.value;

		this.authService.login(credentials).subscribe({
			next: (response) => {
				this.isLoading = false; // ✅ Ocultar GIF al recibir respuesta

				// Verificar si la respuesta tiene token
				if (response && response.token) {
					// Guardar el token
					this.authService.saveToken(response);

					// Mostrar mensaje de éxito
					this.successMessage = response.message || 'Login exitoso';

					// Redirigir al Dashboard después de un breve delay
					setTimeout(() => {
						this.router.navigate(['/dashboard']);
					}, 1500);
				} else {
					this.errorMessage = 'Respuesta inválida del servidor';
				}
			},
			error: (err) => {
				this.isLoading = false; // ✅ Ocultar GIF si hay error
				console.error('Error en login:', err);

				// Manejar diferentes tipos de errores
				if (err.status === 401) {
					this.errorMessage = 'Credenciales incorrectas';
				} else if (err.status === 0) {
					this.errorMessage = 'Error de conexión. Verifique su internet.';
				} else {
					this.errorMessage = err.error?.message || 'Error en el login';
				}
			}
		});
	}

	ngOnDestroy() {
		this.subscription?.unsubscribe(); // ✅ Cerrar la conexión cuando el componente se destruya
	}
}


