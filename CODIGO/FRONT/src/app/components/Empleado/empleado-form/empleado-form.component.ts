import { Component, OnInit } from '@angular/core';
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
export class EmpleadoFormComponent implements OnInit {

  empleadoForm!: FormGroup;
  submitted = false;
  empleado: Empleado | undefined;
  isEditMode = false;
  rols: Rol[] = [];

  constructor(
    private fb: FormBuilder,
    private rolService: RolService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    // Si estamos en modo edición, inicializamos los datos del empleado.
    if (this.empleado) {
      this.isEditMode = true;
    }
    
    // Inicialización del formulario
    this.empleadoForm = this.fb.group({
      id: [this.empleado?.id],
      nombres: [this.empleado?.nombres, Validators.required],
      apellidos: [this.empleado?.apellidos, Validators.required],
      dni: [this.empleado?.dni, [Validators.required, Validators.pattern(/^\d{8}$/)]], // Validación para 8 dígitos
      telefono: [this.empleado?.telefono, Validators.required],
      rol: [this.empleado?.rol, Validators.required]
    });

    // Cargar los roles disponibles
    this.loadRols();
  }

  get f() { return this.empleadoForm.controls; }

  // Manejo del envío del formulario
  onSubmit(): void {
    this.submitted = true;

    // Si el formulario es inválido, no proceder
    if (this.empleadoForm.invalid) {
      return;
    }

    // Si es válido, se cierra el modal y se pasa el valor del formulario
    this.activeModal.close(this.empleadoForm.value);
  }

  // Cargar los roles disponibles
  loadRols(): void {
    this.rolService.get().subscribe(
      (response) => this.rols = response,
      (error) => console.error("Error al cargar roles", error)
    );
  }
}