import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EmpleadoListComponent } from "./components/Empleado/empleado-list/empleado-list.component";
import { ProductoListComponent } from "./components/Producto/producto-list/producto-list.component";
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
    { path:'',redirectTo:'/empleado', pathMatch:'full'}
    
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }