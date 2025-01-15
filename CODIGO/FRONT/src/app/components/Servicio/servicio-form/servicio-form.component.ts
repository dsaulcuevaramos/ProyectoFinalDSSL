import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Servicio } from 'src/app/models/Servicio.model';

import { Usuario } from 'src/app/models/Usuario.model';
import { UsuarioService } from 'src/app/services/UsuarioService';

@Component({
  selector: 'app-servicio-form',
  templateUrl: './servicio-form.component.html',
  styleUrls: ['./servicio-form.component.css']
})
export class ServicioFormComponent {

  servicioForm!: FormGroup;
  submitted = false;
  servicio: Servicio | undefined;
  isEditMode = false;
  usuarios: Usuario[]  = [] ;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    public activeModal: NgbActiveModal
  ){

  }

  ngOnInit(){
    console.log(this.servicio);
    this.servicioForm = this.fb.group({
      id: [this.servicio?.id],
      descripcion: [this.servicio?.descripcion],
      costo: [this.servicio?.costo],
      usuario: [this.servicio?.usuario]
    });
    this.loadRols();
  }

  get f(){return this.servicioForm.controls;} 

  onSubmit(){
    this.submitted = true;
    if(this.servicioForm.valid){
      this.activeModal.close(this.servicioForm.value);
    }
  }

  

  loadRols(){
    this.usuarioService.get().subscribe(
      (response) => this.usuarios = response,
      (error) => console.error("error en el loading", error)
    )
  }
}
