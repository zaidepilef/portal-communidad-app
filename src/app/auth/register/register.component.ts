import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

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
	private subscription: Subscription | null = null;
	registerForm: FormGroup;
	errorMessage: string | null = null;
	successMessage: string | null = null;
	isLoading = false; // ✅ Variable para controlar el GIF de carga

	constructor(private fb: FormBuilder) {

		this.registerForm = this.fb.group({
			username: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required]],
			confirmpassword: ['', [Validators.required]],
		});

	}

	onSubmit() {
		if (this.registerForm.invalid) return;

		// Validar que las contraseñas coincidan
		if (this.registerForm.get('password')?.value !== this.registerForm.get('confirmpassword')?.value) {
			this.errorMessage = 'Las contraseñas no coinciden';
			this.successMessage = null;
			return;
		}

		this.isLoading = true;
		this.errorMessage = null;
		this.successMessage = null;

		const credentials = this.registerForm.value;

		this.authService.register(credentials).subscribe({
			next: (response) => {
				this.isLoading = false;

				if (response.success) {
					// Registro exitoso
					this.successMessage = 'Registro exitoso. Por favor, revise su email para activar su cuenta.';
					// Limpiar formulario
					this.registerForm.reset();
				} else {
					this.errorMessage = response.message || 'Error en el registro';
					this.successMessage = null;
				}
			},
			error: (err) => {
				console.error('Error en registro:', err);
				this.errorMessage = err.error?.message || 'Error en la solicitud';
				this.successMessage = null;
				this.isLoading = false;
			}
		});
	}

	// llamada a service aqui
}
