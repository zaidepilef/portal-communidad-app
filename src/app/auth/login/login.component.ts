import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-login',
	imports: [FormsModule, ReactiveFormsModule,CommonModule,RouterModule],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})

export class LoginComponent {
  private authService = inject(AuthService); // ✅ Inyección con `inject()`
	loginForm: FormGroup;
	errorMessage: string | null = null;

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

		const credentials = this.loginForm.value;

		this.authService.login(credentials).subscribe({
			next: (response) => {

				this.authService.saveToken(response);
				this.router.navigate(['/home']); // Redirigir al Dashboard
			},
			error: (err) => {
				this.errorMessage = 'Correo o contraseña incorrectos';
				console.error('Error en login', err);
			}
		});
	}
}


