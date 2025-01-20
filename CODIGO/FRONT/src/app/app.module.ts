import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//vistas Empleado
import { EmpleadoListComponent } from './components/Empleado/empleado-list/empleado-list.component';
import { EmpleadoFormComponent } from './components/Empleado/empleado-form/empleado-form.component';

//vistas Producto
import { ProductoListComponent } from './components/Producto/producto-list/producto-list.component';
import { ProductoFormComponent } from './components/Producto/producto-form/producto-form.component';
import { HeaderComponent } from './components/templates/header/header.component';
import { HomeComponent } from './components/templates/home/home.component';
import { LoginComponent } from './components/templates/login/login.component';
import { ClienteListComponent } from './components/Cliente/cliente-list/cliente-list.component';
import { ClienteFormComponent } from './components/Cliente/cliente-form/cliente-form.component';
import { ServicioListComponent } from './components/Servicio/servicio-list/servicio-list.component';
import { ServicioFormComponent } from './components/Servicio/servicio-form/servicio-form.component';
import { VehiculoListComponent } from './components/Vehiculo/vehiculo-list/vehiculo-list.component';
import { VehiculoFormComponent } from './components/Vehiculo/vehiculo-form/vehiculo-form.component';
import { UsuarioListComponent } from './components/Usuario/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './components/Usuario/usuario-form/usuario-form.component';
import { CarritoComponent } from './components/Venta/carrito/carrito.component';
import { ReporteComponent } from './components/templates/reporte/reporte.component';


@NgModule({
  declarations: [
    AppComponent,
    EmpleadoListComponent,
    EmpleadoFormComponent,
    ProductoListComponent,
    ProductoFormComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    ClienteListComponent,
    ClienteFormComponent,
    ServicioListComponent,
    ServicioFormComponent,
    VehiculoListComponent,
    VehiculoFormComponent,
    UsuarioListComponent,
    UsuarioFormComponent,
    CarritoComponent,
    ReporteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,  
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
