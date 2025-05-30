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

		this.isLoading = true;

		const credentials = this.registerForm.value;

		this.authService.register(credentials).subscribe({

			next: (response) => {

				this.isLoading = false;
				//this.authService.saveToken(response);
				console.log(response)

			},
			error: (err) => {

				console.error(err)
				this.errorMessage = "Error en la solicitud";
				this.isLoading = false;

			}
		});
	}


	lonSubmit(): void {

		if (this.registerForm.valid) {

			this.isLoading = false;
			console.log('Formulario enviado:', this.registerForm.value);

		} else {

			console.log('Formulario inválido');

		}

	}
}
