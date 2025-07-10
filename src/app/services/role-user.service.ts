import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

interface RoleUser {
  id?: number;
  user_id: number;
  role_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class RoleUserService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });
  }

  getByUserId(userId: number): Observable<RoleUser[]> {
    return this.http.get<RoleUser[]>(`${this.apiUrl}/role-users/user/${userId}`, {
      headers: this.getAuthHeaders()
    });
  }

  create(roleUser: RoleUser): Observable<RoleUser> {
    return this.http.post<RoleUser>(`${this.apiUrl}/role-users`, roleUser, {
      headers: this.getAuthHeaders()
    });
  }

    deleteByUserIdAndRoleId(userId: number, roleId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/role-users/user/${userId}/role/${roleId}`, {
      headers: this.getAuthHeaders()
    });
  }
}
