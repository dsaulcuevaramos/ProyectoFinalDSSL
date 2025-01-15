import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Servicio } from 'src/app/models/Servicio.model';
import { ServicioService } from 'src/app/services/ServicioService';
import { EmpleadoService } from 'src/app/services/Empleado.service';
import { ServicioFormComponent } from '../servicio-form/servicio-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-servicio-list',
  templateUrl: './servicio-list.component.html',
  styleUrls: ['./servicio-list.component.css']
})
export class ServicioListComponent implements OnInit{


  @ViewChild('empleadoModal') EmpleadoModal?: ServicioFormComponent

  servicios: Servicio[]  = [] ;
  servicioForm: FormGroup;
  currentId?: number;
  editMode: boolean = false;


  constructor(private servicioService: ServicioService,
    // private empleadoService: EmpleadoService,
    private fb: FormBuilder, private modalService: NgbModal
  ){

    this.servicioForm = this.fb.group({
      descripcion: [''],
      costo:[''],
      usuario: 0,
    })
  }

  //esto es para inicializar la vista
  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.servicioService.get().subscribe(
      (response) => this.servicios = response,
      (error) => console.error("error en el loading", error)
    )
  }

  edit(servicio: any){
    const modalElement = document.getElementById('servicioModal');

    this.currentId = servicio.id;
    this.servicioForm.patchValue(servicio);
    this.editMode = true;
  }

  delete(id: number){
    const confirmacion = confirm("¿estas seguro?");
    if(confirmacion){
      //this.empeladoService.delete(id).subscribe()
      this.servicioService.delete(id).subscribe(()=>{
        this.load();
      })
    }
  }

  resetFrom(){
   this.servicioForm.reset();
  }

  onSubmit(){
    console.log("onSubmit",this.servicioForm.value);
    if(this.editMode && this.currentId){
      this.servicioService.update(this.currentId, 
        this.servicioForm).subscribe(
          () =>{
            this.load();
            this.resetFrom();
          }
      )
    }else{
      this.servicioService.create(this.servicioForm.value).subscribe(
        () =>{
          this.load();
          this.resetFrom();
        }
      )
    }
  }

  openModal(servicio?: Servicio){
    const modalRef = this.modalService.open(ServicioFormComponent);

    //esto es para saber si va crear o editar
    if(servicio){
      modalRef.componentInstance.servicio = servicio;
      modalRef.componentInstance.isEditMode = true;
    }

    modalRef.result.then((result) =>{
      if(result){
        if(result.id){
          //actualiza si hay datos
          this.servicioService.update(result.id,result).subscribe(
            ()=>{
              this.load();
              this.resetFrom();
            }
          )
        }else{
          //agregará
          this.servicioService.create(result).subscribe(
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
