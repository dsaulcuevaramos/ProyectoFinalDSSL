import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/models/Usuario.model';
import { UsuarioService } from 'src/app/services/UsuarioService';
import { UsuarioFormComponent } from '../usuario-form/usuario-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent {

  @ViewChild('usuarioModal') UsuarioFormModal?: UsuarioFormComponent

  usuarios: Usuario[]  = [] ;
  usuarioForm: FormGroup;
  currentId?: number;
  editMode: boolean = false;


  constructor(private usuarioService: UsuarioService,
    private fb: FormBuilder, private modalService: NgbModal
  ){

    this.usuarioForm = this.fb.group({
      nombre: [''],
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
    this.usuarioService.get().subscribe(
      (response) => this.usuarios = response,
      (error) => console.error("error en el loading", error)
    )
  }

  edit(empleado: any){
    const modalElement = document.getElementById('empleadoModal');

    this.currentId = empleado.id;
    this.usuarioForm.patchValue(empleado);
    this.editMode = true;
  }

  delete(id: number){
    const confirmacion = confirm("¿estas seguro?");
    if(confirmacion){
      //this.usuarioService.delete(id).subscribe()
      this.usuarioService.delete(id).subscribe(()=>{
        this.load();
      })
    }
  }

  resetFrom(){
   this.usuarioForm.reset();
  }

  onSubmit(){
    console.log("onSubmit",this.usuarioForm.value);
    if(this.editMode && this.currentId){
      this.usuarioService.update(this.currentId, 
        this.usuarioForm).subscribe(
          () =>{
            this.load();
            this.resetFrom();
          }
      )
    }else{
      this.usuarioService.create(this.usuarioForm.value).subscribe(
        () =>{
          this.load();
          this.resetFrom();
        }
      )
    }
  }

  openModal(usuario?: Usuario){
    const modalRef = this.modalService.open(UsuarioFormComponent);

    //esto es para saber si va crear o editar
    if(usuario){
      modalRef.componentInstance.empleado = usuario;
      modalRef.componentInstance.isEditMode = true;
    }

    modalRef.result.then((result) =>{
      if(result){
        if(result.id){
          //actualiza si hay datos
          this.usuarioService.update(result.id,result).subscribe(
            ()=>{
              this.load();
              this.resetFrom();
            }
          )
        }else{
          //agregará
          this.usuarioService.create(result).subscribe(
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
