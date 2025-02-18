import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-login',
	imports: [FormsModule, ReactiveFormsModule,CommonModule,RouterModule],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})

export class LoginComponent implements OnDestroy  {

  private authService = inject(AuthService); // ✅ Inyección con `inject()`
  private subscription: Subscription | null = null;
	loginForm: FormGroup;
	errorMessage: string | null = null;
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

		const credentials = this.loginForm.value;

		this.authService.login(credentials).subscribe({
			next: (response) => {
        this.isLoading = false; // ✅ Ocultar GIF al recibir respuesta
				this.authService.saveToken(response);
				this.router.navigate(['/dashboard']); // Redirigir al Dashboard
			},
			error: (err) => {
				this.errorMessage = 'Correo o contraseña incorrectos';
				console.error('Error en login', err);
        this.isLoading = false; // ✅ Ocultar GIF si hay error
			}
		});
	}

  ngOnDestroy() {
    this.subscription?.unsubscribe(); // ✅ Cerrar la conexión cuando el componente se destruya
  }
}


