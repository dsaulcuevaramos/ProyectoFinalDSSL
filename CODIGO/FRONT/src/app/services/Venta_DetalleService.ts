import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VentaDetalle } from '../models/VentaDetalle.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaDetalleService {

  private apiUrl = 'http://localhost:3000/api/venta_detalle';
  
  constructor(private http: HttpClient) { }
  get(venta:number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${venta}`);
  }
  create(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

}
