import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from 'src/app/models/Usuario.model'; 

import { Empleado } from 'src/app/models/Empleado.model';
import { EmpleadoService } from 'src/app/services/Empleado.service';
@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent {

  usuarioForm!: FormGroup;
  submitted = false;
  usuario: Usuario | undefined;
  isEditMode = false;
  empleados: Empleado[]  = [] ;

  constructor(
    private fb: FormBuilder,
    private empleadoService: EmpleadoService,
    public activeModal: NgbActiveModal
  ){

  }

  ngOnInit(){
    console.log(this.usuario);
    this.usuarioForm = this.fb.group({
      id: [this.usuario?.id],
      username: [this.usuario?.username],
      password: [this.usuario?.password],
      empleado: [this.usuario?.empleado],
 
    });
    this.loadRols();
  }

  get f(){return this.usuarioForm.controls;} 

  onSubmit(){
    this.submitted = true;
    if(this.usuarioForm.valid){
      this.activeModal.close(this.usuarioForm.value);
    }
  }

  
  loadRols(){
    this.empleadoService.get().subscribe(
      (response) => this.empleados = response,
      (error) => console.error("error en el loading", error)
    )
  }
}
