import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TokenVerificationResponse, AuthorizationResponse } from '../models/token-verification-model';

@Injectable({
  providedIn: 'root'
})
export class AutorizacionService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Verifica un token de autorización
   * @param token Token a verificar
   * @returns Observable con la respuesta del servidor
   */
  verificarToken(token: string): Observable<TokenVerificationResponse> {
    return this.http.post<TokenVerificationResponse>(`${this.apiUrl}/activation/validate`, { token });
  }

  /**
   * Autoriza el acceso con un token válido
   * @param token Token de autorización
   * @returns Observable con la respuesta del servidor
   */
  autorizarAcceso(token: string): Observable<AuthorizationResponse> {
    return this.http.post<AuthorizationResponse>(`${this.apiUrl}/auth/authorize`, { token });
  }

  /**
   * Guarda el token de autorización en localStorage
   * @param token Token a guardar
   */
  guardarTokenAutorizacion(token: string): void {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('auth_token_timestamp', Date.now().toString());
  }

  /**
   * Obtiene el token de autorización del localStorage
   * @returns Token almacenado o null
   */
  obtenerTokenAutorizacion(): string | null {
    return localStorage.getItem('auth_token');
  }

  /**
   * Verifica si hay un token de autorización válido
   * @returns true si existe un token válido
   */
  tieneTokenAutorizacion(): boolean {
    const token = this.obtenerTokenAutorizacion();
    const timestamp = localStorage.getItem('auth_token_timestamp');

    if (!token || !timestamp) {
      return false;
    }

    // Verificar si el token no ha expirado (24 horas)
    const ahora = Date.now();
    const tiempoToken = parseInt(timestamp);
    const expiracion = 24 * 60 * 60 * 1000; // 24 horas en milisegundos

    return (ahora - tiempoToken) < expiracion;
  }

  /**
   * Elimina el token de autorización
   */
  eliminarTokenAutorizacion(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_token_timestamp');
  }
}
