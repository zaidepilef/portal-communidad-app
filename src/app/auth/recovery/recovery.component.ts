import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recovery',
  imports: [FormsModule, ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './recovery.component.html',
  styleUrl: './recovery.component.scss'
})
export class RecoveryComponent implements OnDestroy {
	private authService = inject(AuthService); // ✅ Inyección con `inject()`
	private subscription: Subscription | null = null;
	recoveryForm: FormGroup;
	errorMessage: string | null = null;
	isLoading = false; // ✅ Variable para controlar el GIF de carga

	constructor(
		private fb: FormBuilder,
		private router: Router,
	) {
		this.recoveryForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required],
		});
	}

	onSubmit() {

		if (this.recoveryForm.invalid) return;
		this.isLoading = true; // ✅ Mostrar GIF de carga

		const credentials = this.recoveryForm.value;

		this.authService.login(credentials).subscribe({
			next: (response) => {
				this.isLoading = false; // ✅ Ocultar GIF al recibir respuesta
				console.log(response);
			},
			error: (err) => {
				this.errorMessage = 'Mensaje';
				console.error('Error en login', err);
				this.isLoading = false; // ✅ Ocultar GIF si hay error
			}
		});
	}

	ngOnDestroy() {
		this.subscription?.unsubscribe(); // ✅ Cerrar la conexión cuando el componente se destruya
	}

}
