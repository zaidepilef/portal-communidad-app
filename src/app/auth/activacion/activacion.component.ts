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
      tipoDocumento: ['COD_DOC', [Validators.required]], // Por defecto COD_DOC
      cedula: ['', [Validators.required, Validators.pattern(/^\d{8,10}$/)]], // 8-10 dígitos
      fechaNacimiento: ['', [Validators.required, this.fechaNacimientoValidator()]]
    });
  }

  // Validador personalizado para fecha de nacimiento
  fechaNacimientoValidator() {
    return (control: { value: string }) => {
      if (!control.value) {
        return null;
      }

      const fecha = new Date(control.value);
      const hoy = new Date();
      let edad = hoy.getFullYear() - fecha.getFullYear();
      const mes = hoy.getMonth() - fecha.getMonth();

      if (mes < 0 || (mes === 0 && hoy.getDate() < fecha.getDate())) {
        edad--;
      }

      if (edad < 18) {
        return { menorEdad: true };
      }

      if (edad > 120) {
        return { fechaInvalida: true };
      }

      return null;
    };
  }

  ngOnInit() {
    // Obtener el token de la URL
    this.token = this.route.snapshot.queryParamMap.get('token') || '';

    // Validar que el token no esté vacío
    if (!this.token || this.token.trim() === '') {
      this.mensaje = 'Token de activación no válido o faltante';
      this.error = true;
      this.isLoading = false;
      return;
    }

    // Mostrar información del token (primeros 10 caracteres)
    this.tokenInfo = this.token.length > 10 ?
      `${this.token.substring(0, 10)}...` :
      this.token;

    // Verificar si hay datos en localStorage (viene del componente autorizar)
    const tokenPerson = localStorage.getItem('token_person');
    const userInfo = localStorage.getItem('userInfo');

    if (tokenPerson && userInfo) {
      this.tokenPerson = tokenPerson;
      this.userInfo = JSON.parse(userInfo);
      this.showForm = true;
      this.isLoading = false;
      this.mensaje = 'Complete sus datos para activar la cuenta.';

      // Limpiar localStorage
      localStorage.removeItem('token_person');
      localStorage.removeItem('userInfo');
    } else {
      // Validar el token
      this.validarToken();
    }
  }

  validarToken() {
    // Validar el token
    this.authService.validateActivationToken(this.token).subscribe({
      next: (response) => {
        // Verificar si la respuesta tiene la estructura esperada
        if (response && response.status === 'success' && response.token_person) {
          // Guardar el token_person que devuelve la validación
          this.tokenPerson = response.token_person;
          this.userInfo = response.user; // Asignar la información del usuario

          // Mostrar formulario para completar datos
          this.showForm = true;
          this.isLoading = false;
          this.mensaje = 'Token válido. Complete sus datos para activar la cuenta.';

        } else {
          this.mensaje = response?.message || 'Token de activación inválido o expirado';
          this.error = true;
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.error('Error validando token:', err);

        // Manejar diferentes tipos de errores
        if (err.status === 401) {
          this.mensaje = err.error?.error || 'Token de activación inválido';
        } else if (err.status === 404) {
          this.mensaje = 'Token de activación no encontrado';
        } else if (err.status === 400) {
          this.mensaje = 'Token de activación inválido';
        } else if (err.status === 0) {
          this.mensaje = 'Error de conexión. Verifique su internet.';
        } else {
          this.mensaje = err.error?.error || err.error?.message || 'Error al validar el token de activación';
        }

        this.error = true;
        this.isLoading = false;
      }
    });
  }

  onSubmitForm() {
    if (this.userDataForm.invalid) return;

    this.isLoading = true;
    this.mensaje = 'Activando cuenta...';

    // Preparar datos para enviar al endpoint de activación
    // El token_person es específico solo para este endpoint
    const activationData = {
      nombre: this.userDataForm.value.nombre,
      apellido: this.userDataForm.value.apellido,
      tipoDocumento: this.userDataForm.value.tipoDocumento,
      cedula: this.userDataForm.value.cedula,
      fechaNacimiento: this.userDataForm.value.fechaNacimiento,
      token_person: this.tokenPerson // Token específico para activación
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

  reintentar() {
    this.isLoading = true;
    this.error = false;
    this.success = false;
    this.showForm = false;
    this.mensaje = 'Reintentando validación...';
    this.validarToken();
  }
}
