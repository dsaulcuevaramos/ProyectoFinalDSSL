import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Empleado } from 'src/app/models/Empleado.model';

import { Rol } from 'src/app/models/Rol.model';
import { RolService } from 'src/app/services/RolService';
@Component({
  selector: 'app-empleado-form',
  templateUrl: './empleado-form.component.html',
  styleUrls: ['./empleado-form.component.css']
})
export class EmpleadoFormComponent {

  empleadoForm!: FormGroup;
  submitted = false;
  empleado: Empleado | undefined;
  isEditMode = false;
  rols: Rol[]  = [] ;

  constructor(
    private fb: FormBuilder,
    private rolService: RolService,
    public activeModal: NgbActiveModal
  ){

  }

  ngOnInit(){
    console.log(this.empleado);
    this.empleadoForm = this.fb.group({
      id: [this.empleado?.id],
      nombres: [this.empleado?.nombres],
      apellidos: [this.empleado?.apellidos],
      dni: [this.empleado?.dni],
      telefono: [this.empleado?.telefono],
      correo: [this.empleado?.correo],
      rol: [this.empleado?.rol]
    });
    this.loadRols();
  }

  get f(){return this.empleadoForm.controls;} 

  onSubmit(){
    this.submitted = true;
    if(this.empleadoForm.valid){
      this.activeModal.close(this.empleadoForm.value);
    }
  }

  
  loadRols(){
    this.rolService.get().subscribe(
      (response) => this.rols = response,
      (error) => console.error("error en el loading", error)
    )
  }

}
