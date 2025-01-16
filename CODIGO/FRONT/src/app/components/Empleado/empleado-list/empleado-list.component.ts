import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Empleado } from 'src/app/models/Empleado.model';
import { EmpleadoService } from 'src/app/services/Empleado.service';
import { UsuarioService } from 'src/app/services/UsuarioService';
import { EmpleadoFormComponent } from '../empleado-form/empleado-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-empleado-list',
  templateUrl: './empleado-list.component.html',
  styleUrls: ['./empleado-list.component.css']
})
export class EmpleadoListComponent implements OnInit{

  @ViewChild('empleadoModal') EmpleadoModal?: EmpleadoFormComponent

  empleados: Empleado[]  = [] ;
  empleadoForm: FormGroup;
  currentId?: number;
  editMode: boolean = false;


  constructor(private empleadoService: EmpleadoService,
    private usuarioService: UsuarioService,
    private fb: FormBuilder, private modalService: NgbModal
  ){

    this.empleadoForm = this.fb.group({
      nombres: [''],
      apellido:[''],
      dni:[''],
      telefono:[''],
      correo:[''],
      rol: 0,
      estado: false,
    })
  }

  //esto es para inicializar la vista
  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.empleadoService.get().subscribe(
      (response) => this.empleados = response,
      (error) => console.error("error en el loading", error)
    )
  }

  edit(empleado: any){
    const modalElement = document.getElementById('empleadoModal');

    this.currentId = empleado.id;
    this.empleadoForm.patchValue(empleado);
    this.editMode = true;
  }

  delete(id: number){
    const confirmacion = confirm("¿estas seguro?");
    if(confirmacion){
      this.usuarioService.delete(id).subscribe()
      this.empleadoService.delete(id).subscribe(()=>{
        this.load();
      })
    }
  }

  resetFrom(){
   this.empleadoForm.reset();
  }

  onSubmit(){
    console.log("onSubmit",this.empleadoForm.value);
    if(this.editMode && this.currentId){
      this.empleadoService.update(this.currentId, 
        this.empleadoForm).subscribe(
          () =>{
            this.load();
            this.resetFrom();
          }
      )
    }else{
      this.empleadoService.create(this.empleadoForm.value).subscribe(
        () =>{
          this.load();
          this.resetFrom();
        }
      )
    }
  }

  openModal(empleado?: Empleado){
    const modalRef = this.modalService.open(EmpleadoFormComponent);

    //esto es para saber si va crear o editar
    if(empleado){
      modalRef.componentInstance.empleado = empleado;
      modalRef.componentInstance.isEditMode = true;
    }

    modalRef.result.then((result) =>{
      if(result){
        if(result.id){
          //actualiza si hay datos
          this.empleadoService.update(result.id,result).subscribe(
            ()=>{
              this.load();
              this.resetFrom();
            }
          )
        }else{
          //agregará
          this.empleadoService.create(result).subscribe(
            ()=>{
              this.load();
              this.resetFrom();
            }
          )
        }
      }
    }).catch(()=>{
      //modal dismissed
    })

  }

}
