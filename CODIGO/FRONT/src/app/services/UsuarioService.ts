import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/Usuario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:3000/api/usuarios';
  
  constructor(private http: HttpClient) { }
  get(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }
  create(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  deleteByEmpleado(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/empleado/${id}`);
  }
  getForLogin(username:string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/login/${username}`);
  }
  getMecanicos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/mecanicos/${3}`); 
  }

}