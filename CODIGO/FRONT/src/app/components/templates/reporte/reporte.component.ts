import { Component, OnInit } from '@angular/core';
import { VentaDetalleService } from 'src/app/services/Venta_DetalleService';
import { ServicioDetalleService } from 'src/app/services/Servicio_DetalleService';
import { ServicioDetalle } from 'src/app/models/ServicioDetalle.model';
import { VentaDetalle } from 'src/app/models/VentaDetalle.model';
import { Venta } from 'src/app/models/Venta.model';
import { VentaService } from 'src/app/services/VentaService';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit{

  serviciosDetalle: ServicioDetalle[] = []
  ventasDetalleOriginal: any[] = [];
  serviciosOriginal: ServicioDetalle[] = [];
  ventasDetalle: any[] = []
  ventas: Venta[] = []
  ventasOriginal: Venta[] = []
  date: string = ''
  importeventa: number = 0;
  importeservicio: number = 0;

  constructor(
      private ventaService: VentaService,
      private ventaDetalleService: VentaDetalleService,
      private servicioDetalleService: ServicioDetalleService,
    ){
    }

  ngOnInit(): void {
    this.loadServicioDetalles()
    this.loadVentas()
  }

  loadServicioDetalles(): void {
    this.servicioDetalleService.get().subscribe(
      (response) => {
        this.serviciosDetalle = response;
        this.serviciosOriginal = [...response]; // Guardar una copia original para filtrar más tarde
      },
      (error) => console.error("error en el loading", error)
    );
    
  }

  loadVentas(): void {
    this.ventaService.get().subscribe(
      (response) => {
        this.ventas = response;
        this.ventasOriginal = [...response]; // Guardar una copia original para filtrar más tarde
      },
      (error) => console.error("error en el loading", error)
    );
  }

  loadVentasDetalles(venta:number): void {
    this.ventaDetalleService.get(venta).subscribe(
      (response) => this.ventasDetalle = response,
      (error) => console.error("error en el loading", error)
    )
  }

  filterByDate(): void {
    if (this.date) {
      const selectedDate = this.date; // La fecha seleccionada (YYYY-MM-DD)

      // Filtrar los datos según la fecha seleccionada
      this.serviciosDetalle = this.serviciosOriginal.filter(service => {
        const serviceDate = service.fecha.split('T')[0]; // Extraer solo la fecha (YYYY-MM-DD)
        return serviceDate === selectedDate;
      });

      this.ventas = this.ventasOriginal.filter(venta => {
        const ventaDate = venta.fecha.split('T')[0]; // Extraer solo la fecha (YYYY-MM-DD)
        return ventaDate === selectedDate;
      });
    } else {
      // Si no hay fecha seleccionada, restauramos los datos originales
      this.serviciosDetalle = [...this.serviciosOriginal];
      this.ventas = [...this.ventasOriginal];
    }
    this.calculateTotalVentas();
    this.calculateTotalService();
  }

   // Calcular el total de ventas
   calculateTotalVentas(): void {
    this.importeventa = this.ventas.reduce((sum, venta) => sum + venta.importetotal, 0);
  }

  // Calcular el total de servicios
  calculateTotalService(): void {
    this.importeservicio = this.serviciosDetalle.reduce((sum, service) => sum + service.costototal, 0);
  }

}
