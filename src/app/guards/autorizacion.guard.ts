import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AutorizacionService } from '../services/autorizacion.service';

@Injectable({
  providedIn: 'root'
})
export class AutorizacionGuard implements CanActivate {

  constructor(
    private autorizacionService: AutorizacionService,
    private router: Router
  ) {}

  canActivate(): boolean {
    // Verificar si hay un token de autorización válido
    if (this.autorizacionService.tieneTokenAutorizacion()) {
      return true;
    }

    // Si no hay token válido, redirigir a login
    this.router.navigate(['/auth/login']);
    return false;
  }
}
