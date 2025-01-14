import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EmpleadoListComponent } from "./components/empleado-list/empleado-list.component";
const routes: Routes = [
    { path: 'empleado', component: EmpleadoListComponent },
    { path:'',redirectTo:'/empleado', pathMatch:'full'}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }