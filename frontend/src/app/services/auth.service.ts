import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient, private router: Router  ) { }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar`, userData);
  }

  login(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userData);
  }

  getUser(): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
        'Authorization':`Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}/usuario`, {headers});
  }

  updateUser(userData: any): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
        'Authorization':`Bearer ${token}`
    });
    return this.http.put(`${this.apiUrl}/usuario`, userData, {headers});
  }

  deleteUser(): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
        'Authorization':`Bearer ${token}`
    });
    return this.http.delete(`${this.apiUrl}/usuario`, {headers});
  }

  logout(): void {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token');
        this.router.navigate(['/registrar']);
    }
}

  isAuthenticated(): boolean {
    if (typeof window !== 'undefined') {
        return !!localStorage.getItem('access_token');
    }

    return false;
  }
}
