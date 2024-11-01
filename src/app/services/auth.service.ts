import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authApiUrl = environment.authApiUrl;
  private logoutApiUrl = environment.logoutApiUrl;
  private token: string | null = null;
  private role: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${this.authApiUrl}`, 
      { email, password },
      { headers: headers, withCredentials: true }
    ).pipe(
      tap(response => {
        const token = response.data?.accessToken;
        const role = response.data?.loggedInUser?.role;

        if (token && role) {
          this.storeUserData(token, role);
        } else {
          console.error('Token or role is missing in the response');
        }
      })
    );
  }

  storeUserData(token: string, role: string): void {
    this.token = token;
    this.role = role;
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
  }

  getRole(): string | null {
    return this.role || localStorage.getItem('role');
  }

  isLoggedIn(): boolean {
    const token = this.token || localStorage.getItem('token');
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string): boolean {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiryTime = payload.exp * 1000;
    return Date.now() > expiryTime;
  }

  logout(): Observable<any> {
    return this.http.get(`${this.logoutApiUrl}`, {withCredentials: true}); 
  }
}
