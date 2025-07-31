import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface EmailResponse {
  success: boolean;
  message?: string;
  emailId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Envía email de activación
   * @param email Email del usuario
   * @param token Token de activación
   * @returns Observable con la respuesta del servidor
   */
  enviarEmailActivacion(email: string, token: string): Observable<EmailResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const data = {
      email: email,
      token: token,
      tipo: 'activacion'
    };

    return this.http.post<EmailResponse>(`${this.apiUrl}/api/email/send`, data, { headers });
  }

  /**
   * Envía email de recuperación de contraseña
   * @param email Email del usuario
   * @param token Token de recuperación
   * @returns Observable con la respuesta del servidor
   */
  enviarEmailRecuperacion(email: string, token: string): Observable<EmailResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const data = {
      email: email,
      token: token,
      tipo: 'recuperacion'
    };

    return this.http.post<EmailResponse>(`${this.apiUrl}/api/email/send`, data, { headers });
  }

  /**
   * Genera el enlace de activación
   * @param token Token de activación
   * @returns URL completa de activación
   */
  generarEnlaceActivacion(token: string): string {
    const baseUrl = window.location.origin;
    return `${baseUrl}/auth/activacion?token=${token}`;
  }

  /**
   * Genera el enlace de recuperación
   * @param token Token de recuperación
   * @returns URL completa de recuperación
   */
  generarEnlaceRecuperacion(token: string): string {
    const baseUrl = window.location.origin;
    return `${baseUrl}/auth/recovery?token=${token}`;
  }
}
