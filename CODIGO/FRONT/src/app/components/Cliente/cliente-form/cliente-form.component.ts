import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from 'src/app/models/Cliente.model';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent {

  clienteForm!: FormGroup;
  submitted = false;
  cliente: Cliente | undefined;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ){}

  ngOnInit(){
    console.log(this.cliente);
    this.clienteForm = this.fb.group({
      id: [this.cliente?.id],
      nombres: [this.cliente?.nombres],
      apellidos: [this.cliente?.apellidos],
      dni: [this.cliente?.dni],
    });
  } 

  //obtener control del componente form
  get f(){return this.clienteForm.controls;} 

  //guardar y volver al component list
  onSubmit(){
    this.submitted = true;
    if(this.clienteForm.valid){
      this.activeModal.close(this.clienteForm.value);
    }
  }

}
