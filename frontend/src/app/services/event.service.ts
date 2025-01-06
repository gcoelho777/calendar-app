import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { EventResponse } from '../event-response.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
    private apiUrl = 'http://127.0.0.1:8000/api/eventos';

    constructor(private http: HttpClient) { }

    getEvents(): Observable<any> {
        if (typeof window !== 'undefined') {
        const token = localStorage.getItem('access_token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
            return this.http.get<EventResponse>(this.apiUrl, {headers}).pipe(
                map(response => response.data)
            );
        }else {
            return new Observable(observer => {
                observer.next([]);
                observer.complete();
            });
        }
    }

    getEvent(id: string | null): Observable<any> {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('access_token');
            const headers = new HttpHeaders({
                'Authorization': `Bearer ${token}`
            });
            return this.http.get(`${this.apiUrl}/${id}`, { headers });
        } else {
            return new Observable(observer => {
                observer.next([]);
                observer.complete();
            });
        }
        
    }

    createEvent(event: any): Observable<any> {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('access_token');
            const headers = new HttpHeaders({
                'Authorization': `Bearer ${token}`
            });
            return this.http.post(this.apiUrl, event, {headers});
        } else {
            return new Observable(observer => {
                observer.next([]);
                observer.complete();
            });
        }
    }

    updateEvent(id: string | null, event: any): Observable<any> {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('access_token');
            const headers = new HttpHeaders({
                'Authorization': `Bearer ${token}`
            });
            return this.http.put(`${this.apiUrl}/${id}`, event, {headers});
        } else {
            return new Observable(observer => {
                observer.next([]);
                observer.complete();
            });
        }
    }

    deleteEvent(id: string | null): Observable<any> {
        if (typeof window !== 'undefined') {
        const token = localStorage.getItem('access_token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.delete(`${this.apiUrl}/${id}`, {headers});
        } else {
            return new Observable(observer => {
                observer.next([]);
                observer.complete();
            });
        }
    } 

}
