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
  ) { }

  ngOnInit(): void {
    console.log(this.cliente);
    // Inicializamos el formulario con validaciones
    this.clienteForm = this.fb.group({
      id: [this.cliente?.id],
      nombres: [this.cliente?.nombres, [Validators.required]],  // Validación: Campo requerido
      apellidos: [this.cliente?.apellidos, [Validators.required]],  // Validación: Campo requerido
      dni: [this.cliente?.dni, [Validators.required, Validators.pattern('^[0-9]{8,9}$')]],  // Validación: Campo requerido y patrón de DNI
    });
  }

  // Obtener el control del formulario
  get f() { return this.clienteForm.controls; }

  // Guardar y cerrar el modal
  onSubmit(): void {
    this.submitted = true;

    // Si el formulario es válido, se cierra el modal y se envía el valor
    if (this.clienteForm.valid) {
      this.activeModal.close(this.clienteForm.value);
    }
  }
}