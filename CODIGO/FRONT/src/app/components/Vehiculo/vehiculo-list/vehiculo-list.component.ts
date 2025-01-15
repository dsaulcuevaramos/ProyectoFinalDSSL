import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Vehiculo } from 'src/app/models/Vehiculo.model';
import { VehiculoService } from 'src/app/services/VehiculoService';
import { ClienteService } from 'src/app/services/ClienteService';
import { VehiculoFormComponent } from '../vehiculo-form/vehiculo-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-vehiculo-list',
  templateUrl: './vehiculo-list.component.html',
  styleUrls: ['./vehiculo-list.component.css']
})
export class VehiculoListComponent implements OnInit{

@ViewChild('empleadoModal') VehiculoModal?: VehiculoFormComponent

  vehiculos: Vehiculo[]  = [] ;
  vehiculoForm: FormGroup;
  currentId?: number;
  editMode: boolean = false;


  constructor(private vehiculoService: VehiculoService,
    //private clienteService: ClienteService,
    private fb: FormBuilder, private modalService: NgbModal
  ){

    this.vehiculoForm = this.fb.group({
      placa: [''],
      marca:[''],
      modelo:[''],
      estado: false,
      cliente: 0,
    })
  }

  //esto es para inicializar la vista
  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.vehiculoService.get().subscribe(
      (response) => this.vehiculos = response,
      (error) => console.error("error en el loading", error)
    )
  }

  edit(empleado: any){
    const modalElement = document.getElementById('empleadoModal');

    this.currentId = empleado.id;
    this.vehiculoForm.patchValue(empleado);
    this.editMode = true;
  }

  delete(id: number){
    const confirmacion = confirm("¿estas seguro?");
    if(confirmacion){
      this.vehiculoService.delete(id).subscribe(()=>{
        this.load();
      })
    }
  }

  resetFrom(){
   this.vehiculoForm.reset();
  }

  onSubmit(){
    console.log("onSubmit",this.vehiculoForm.value);
    if(this.editMode && this.currentId){
      this.vehiculoService.update(this.currentId, 
        this.vehiculoForm).subscribe(
          () =>{
            this.load();
            this.resetFrom();
          }
      )
    }else{
      this.vehiculoService.create(this.vehiculoForm.value).subscribe(
        () =>{
          this.load();
          this.resetFrom();
        }
      )
    }
  }

  openModal(vehiculo?: Vehiculo){
    const modalRef = this.modalService.open(VehiculoFormComponent);

    //esto es para saber si va crear o editar
    if(vehiculo){
      modalRef.componentInstance.vehiculo = vehiculo;
      modalRef.componentInstance.isEditMode = true;
    }

    modalRef.result.then((result) =>{
      if(result){
        if(result.id){
          //actualiza si hay datos
          this.vehiculoService.update(result.id,result).subscribe(
            ()=>{
              this.load();
              this.resetFrom();
            }
          )
        }else{
          //agregará
          this.vehiculoService.create(result).subscribe(
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
