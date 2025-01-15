import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Producto } from 'src/app/models/Producto.model';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent {

  productoForm!: FormGroup;
  submitted = false;
  producto: Producto | undefined;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ){}

  ngOnInit(){
    console.log(this.producto);
    this.productoForm = this.fb.group({
      id: [this.producto?.id],
      nombre: [this.producto?.nombre],
      descripcion: [this.producto?.descripcion],
      precio: [this.producto?.precio],
      stock: [this.producto?.stock],
      estado: [this.producto?.estado]
    });
  } 

  //obtener control del componente form
  get f(){return this.productoForm.controls;} 

  //guardar y volver al component list
  onSubmit(){
    this.submitted = true;
    if(this.productoForm.valid){
      this.activeModal.close(this.productoForm.value);
    }
  }

}
