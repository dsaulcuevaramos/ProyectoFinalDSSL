import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { EmpleadoListComponent } from "./components/Empleado/empleado-list/empleado-list.component";
import { ProductoListComponent } from "./components/Producto/producto-list/producto-list.component";
import { ClienteListComponent } from "./components/Cliente/cliente-list/cliente-list.component";
import { VehiculoListComponent } from "./components/Vehiculo/vehiculo-list/vehiculo-list.component";
import { ServicioListComponent } from "./components/Servicio/servicio-list/servicio-list.component";
import { UsuarioListComponent } from "./components/Usuario/usuario-list/usuario-list.component";
import { HomeComponent } from "./components/templates/home/home.component";
import { LoginComponent } from "./components/templates/login/login.component"; 

const routes: Routes = [
    //Login
    { path: 'login', component: LoginComponent },
    { path:'',redirectTo:'/login', pathMatch:'full'},
    //Home inicial
    { path: 'home', component: HomeComponent },
    { path:'',redirectTo:'/home', pathMatch:'full'},
    //rutear producto
    { path: 'producto', component: ProductoListComponent },
    { path:'',redirectTo:'/producto', pathMatch:'full'},
    //rutear empleado
    { path: 'empleado', component: EmpleadoListComponent },
    { path:'',redirectTo:'/empleado', pathMatch:'full'},
    //rutear cliente
    { path: 'cliente', component: ClienteListComponent },
    { path:'',redirectTo:'/cliente', pathMatch:'full'},
    //rutear vehiculo
    { path: 'vehiculo', component: VehiculoListComponent },
    { path:'',redirectTo:'/vehiculo', pathMatch:'full'},
    //rutear servicio
    { path: 'servicio', component: ServicioListComponent },
    { path:'',redirectTo:'/servicio', pathMatch:'full'},
    //rutear usuario
    { path: 'usuario', component: UsuarioListComponent },
    { path:'',redirectTo:'/usuario', pathMatch:'full'}
    
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }