import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/Producto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl = 'http://localhost:3000/api/productos';
  
  constructor(private http: HttpClient) { }
  get(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
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

  getByNombre(nombre:string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/producto/${nombre}`);
  }
}
