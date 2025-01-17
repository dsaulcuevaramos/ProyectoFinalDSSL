import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServicioDetalle } from '../models/ServicioDetalle.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioDetalleService {

  private apiUrl = 'http://localhost:3000/api/servicio_detalle';
  
  constructor(private http: HttpClient) { }
  get(): Observable<ServicioDetalle[]> {
    return this.http.get<ServicioDetalle[]>(this.apiUrl);
  }
  create(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

}
