import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Empleado } from 'src/app/models/Empleado.model';

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

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ){

  }

  ngOnInit(){
    console.log(this.empleado);
    this.empleadoForm = this.fb.group({
      id: [this.empleado?.id],
      nombre: [this.empleado?.nombre],
      apellido: [this.empleado?.apellido],
      dni: [this.empleado?.dni],
      telefono: [this.empleado?.telefono],
      correo: [this.empleado?.correo],
      tipo: [this.empleado?.tipo]
    });
  }

  get f(){return this.empleadoForm.controls;} 

  onSubmit(){
    this.submitted = true;
    if(this.empleadoForm.valid){
      this.activeModal.close(this.empleadoForm.value);
    }
  }
}
