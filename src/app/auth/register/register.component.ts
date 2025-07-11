import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterRequest, RegisterResponse } from 'src/app/models/register-model';

@Component({
	selector: 'app-register',
	imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
	templateUrl: './register.component.html',
	styleUrl: './register.component.scss'
})
/**
 * @class RegisterComponent
 * @description This component handles the user registration form.
 * It initializes the form with fields for username, name, lastname, and email,
 * and includes validation for each field.
 *
 * @property {FormGroup} registerForm - The form group for the registration form.
 *
 * @constructor
 * @param {FormBuilder} fb - The form builder service used to create the form group.
 *
 * @method onSubmit
 * @description This method is called when the form is submitted. It checks if the form is valid,
 * and logs the form values to the console if it is valid, or logs an invalid form message if it is not.
 */
export class RegisterComponent {
	private authService = inject(AuthService); // ✅ Inyección con `inject()`
	registerForm: FormGroup;
	errorMessage: string | null = null;
	successMessage: string | null = null;
	isLoading = false; // ✅ Variable para controlar el GIF de carga
	showPassword = false; // Controla visibilidad de password
	showConfirmPassword = false; // Controla visibilidad de confirm password
	registerRequest: RegisterRequest = {
		username: '',
		email: '',
		password: '',
		confirmpassword: ''
	};
	registerResponse: RegisterResponse | null = null;

	constructor(private fb: FormBuilder) {


		this.registerForm = this.fb.group({
			username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [
				Validators.required,
				Validators.minLength(8),
				Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]*/)
			]],
			confirmpassword: ['', [Validators.required]],
		});

	}

	// Método para alternar visibilidad de password
	togglePasswordVisibility() {
		this.showPassword = !this.showPassword;
	}

	// Método para alternar visibilidad de confirm password
	toggleConfirmPasswordVisibility() {
		this.showConfirmPassword = !this.showConfirmPassword;
	}

	onSubmit() {
		if (this.registerForm.invalid) return;

		// Validar que las contraseñas coincidan
		if (this.registerForm.get('password')?.value !== this.registerForm.get('confirmpassword')?.value) {
			this.errorMessage = 'Las contraseñas no coinciden';
			this.successMessage = null;
			return;
		}
		this.registerRequest = this.registerForm.value;
		this.isLoading = true;
		this.errorMessage = null;
		this.successMessage = null;


		// Simula un retardo de 5 segundos antes de llamar al servicio
		setTimeout(() => {
			this.callService();
		}, 5000);
	}

	// llamada a service aqui
	callService() {

		// Lógica para manejar la respuesta del registro y mostrar mensajes en español
		// Si la respuesta contiene un mensaje de éxito y un enlace de activación, lo mostramos de forma clara al usuario.
		// También podemos mostrar un mensaje especial si el email fue enviado correctamente.
		// Este bloque se ejecuta antes de la suscripción al observable, por lo que aquí solo podrías preparar lógica previa si fuera necesario.
		// En este punto, no hay respuesta aún, así que no se puede mostrar el mensaje aquí.
		this.authService.register(this.registerRequest).subscribe({

			next: (response) => {
				if (response) {
					this.isLoading = false;
					this.successMessage = response.message + ' Activa tu cuenta usando el enlace enviado a tu correo.';
					this.errorMessage = null;
					this.registerForm.reset();
					// Si quieres mostrar el enlace de activación directamente (por ejemplo, en desarrollo), puedes descomentar la siguiente línea:
					// this.successMessage += ` Enlace de activación: ${response.activation_link}`;
					return;

				} else {
					this.errorMessage = response?.message || 'Ocurrió un error al crear la cuenta.';
					this.successMessage = null;
				}
			},
			error: (err) => {
				this.isLoading = false;
				this.errorMessage = err.error?.message || 'Ocurrió un error inesperado al crear la cuenta.';
				this.successMessage = null;
			}
		});


	}
}
