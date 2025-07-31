import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { ActivateAccountService } from 'src/app/services/activate-account.service';

@Component({
	selector: 'app-register-code',
	imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
	templateUrl: './register-code.component.html',
	styleUrl: './register-code.component.scss'
})
export class RegisterCodeComponent implements OnInit, OnDestroy {

	private authService = inject(AuthService);
	private activateAccountService = inject(ActivateAccountService);
	private router = inject(Router);
	private route = inject(ActivatedRoute);
	private subscription: Subscription | null = null;

	// Formulario para el código de verificación
	registerCodeForm: FormGroup;

	// Variables de estado
	isLoading = false;
	errorMessage: string | null = null;
	successMessage: string | null = null;
	resendDisabled = false;
	resendCountdown = 160;

	// Email del usuario (se obtiene de la ruta o localStorage)
	userName: string = '';
	userEmail: string = '';
	userToken: string = '';

	constructor(private fb: FormBuilder) {
		this.registerCodeForm = this.fb.group({
			code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
		});
	}

	ngOnInit() {

		// Obtener el email del usuario desde la ruta o localStorage
		this.route.queryParams.subscribe(params => {
			this.userName = params['name'] || localStorage.getItem('name') || '';
			this.userEmail = params['email'] || localStorage.getItem('email') || '';
			this.userToken = params['token'] || localStorage.getItem('token') || '';
		});

		// Si no hay email, redirigir al registro
		if (!this.userEmail) {
			this.router.navigate(['/auth/register']);
		}

		if (!this.userToken) {
			this.router.navigate(['/auth/register']);
		}

		if (!this.userName) {
			this.router.navigate(['/auth/register']);
		}
	}

	onSubmit() {
		if (this.registerCodeForm.invalid) return;

		this.isLoading = true;
		this.errorMessage = null;
		this.successMessage = null;
		this.registerCodeForm.disable();
		// Simular delay de red
		setTimeout(() => {
			this.ActivateAccountCode();
		}, 3000);
	}

	ActivateAccountCode() {

		const verificationData = {
			email: this.userEmail,
			token: this.userToken,
			code: this.registerCodeForm.value.code
		};

		this.activateAccountService.activateAccount(verificationData).subscribe({
			next: (response) => {
				this.isLoading = false;
				this.registerCodeForm.enable();

				if (response.success) {
					this.successMessage = response.message || '¡Código verificado exitosamente! Tu cuenta ha sido activada.';
					// Limpiar datos temporales
					localStorage.removeItem('pendingEmail');
					// Redirigir al login después de 2 segundos
					setTimeout(() => {
						this.router.navigate(['/auth/login']);
					}, 10000);
				} else {
					this.errorMessage = response.message || 'Código inválido. Por favor, verifica el código enviado a tu email.';
				}
			},
			error: (err) => {
				this.isLoading = false;
				this.registerCodeForm.enable();
				console.error('Error en verificación:', err);
				if (err.status === 400) {
					this.errorMessage = err.error.message || 'Código inválido o expirado.';
				} else if (err.status === 0) {
					this.errorMessage = 'Error de conexión. Verifique su internet.';
				} else {
					this.errorMessage = err.error?.message || 'Error en la verificación del código.';
				}
			}
		});
	}

	resendCode() {
		this.resendDisabled = true;
		this.errorMessage = null;
		this.successMessage = null;

		this.authService.resendVerificationCode(this.userEmail).subscribe({
			next: (response) => {
				this.successMessage = response.message || 'Nuevo código enviado a tu email.';
				this.startResendCountdown();
			},
			error: (err) => {
				this.resendDisabled = false;
				console.error('Error al reenviar código:', err);

				if (err.status === 0) {
					this.errorMessage = 'Error de conexión. Verifique su internet.';
				} else {
					this.errorMessage = err.error?.message || 'Error al reenviar el código.';
				}
			}
		});
	}

	startResendCountdown() {
		const countdown = setInterval(() => {
			this.resendCountdown--;
			if (this.resendCountdown <= 0) {
				clearInterval(countdown);
				this.resendDisabled = false;
				this.resendCountdown = 60;
			}
		}, 1000);
	}

	// Método para manejar el input del código (opcional)
	onCodeInput(event: Event) {
		const input = event.target as HTMLInputElement;
		const value = input.value.replace(/\D/g, ''); // Solo números

		if (value.length > 6) {
			input.value = value.slice(0, 6);
		}

		this.registerCodeForm.patchValue({ code: input.value });
	}

	ngOnDestroy() {
		this.subscription?.unsubscribe();
	}
}
