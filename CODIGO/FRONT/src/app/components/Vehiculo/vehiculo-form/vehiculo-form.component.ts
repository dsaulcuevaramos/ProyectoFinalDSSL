import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Vehiculo } from 'src/app/models/Vehiculo.model';

import { Cliente } from 'src/app/models/Cliente.model';
import { ClienteService } from 'src/app/services/ClienteService';

@Component({
  selector: 'app-vehiculo-form',
  templateUrl: './vehiculo-form.component.html',
  styleUrls: ['./vehiculo-form.component.css']
})
export class VehiculoFormComponent {

  vehiculoForm!: FormGroup;
  submitted = false;
  vehiculo: Vehiculo | undefined;
  isEditMode = false;
  clientes: Cliente[]  = [] ;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    public activeModal: NgbActiveModal
  ){

  }

  ngOnInit(){
    console.log(this.vehiculo);
    this.vehiculoForm = this.fb.group({
      id: [this.vehiculo?.id],
      placa: [this.vehiculo?.placa],
      marca: [this.vehiculo?.marca],
      modelo: [this.vehiculo?.modelo],
      cliente: [this.vehiculo?.cliente]
    });
    this.loadCliente();
  }

  get f(){return this.vehiculoForm.controls;} 

  onSubmit(){
    this.submitted = true;
    if(this.vehiculoForm.valid){
      this.activeModal.close(this.vehiculoForm.value);
    }
  }

  
  loadCliente(){
    this.clienteService.get().subscribe(
      (response) => this.clientes = response,
      (error) => console.error("error en el loading", error)
    )
  }
}
