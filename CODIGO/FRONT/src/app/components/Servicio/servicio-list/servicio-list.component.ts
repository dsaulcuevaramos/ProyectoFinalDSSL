import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Servicio } from 'src/app/models/Servicio.model';
import { ServicioService } from 'src/app/services/ServicioService';
import { ServicioFormComponent } from '../servicio-form/servicio-form.component';
import { ClienteFormComponent } from '../../Cliente/cliente-form/cliente-form.component';
import { VehiculoFormComponent } from '../../Vehiculo/vehiculo-form/vehiculo-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteService } from 'src/app/services/ClienteService';
import { VehiculoService } from 'src/app/services/VehiculoService';
import { Cliente } from 'src/app/models/Cliente.model';
import { Vehiculo } from 'src/app/models/Vehiculo.model';
import { ServicioDetalleService } from 'src/app/services/Servicio_DetalleService';



@Component({
  selector: 'app-servicio-list',
  templateUrl: './servicio-list.component.html',
  styleUrls: ['./servicio-list.component.css']
})
export class ServicioListComponent implements OnInit{


  @ViewChild('empleadoModal') EmpleadoModal?: ServicioFormComponent
  @ViewChild('clienteModal') ClienteModal?: ClienteFormComponent
  @ViewChild('vehiculoModal') VehiculoModal?: VehiculoFormComponent

  servicios: Servicio[]  = [] ;
  servicioForm: FormGroup;
  currentId?: number;
  editMode: boolean = false;

  idservicio: number = 0;


  placa: string = ''; 
  cliente: Cliente | undefined;
  vehiculo: Vehiculo | undefined;
  servicio: Servicio | undefined;

  constructor(private servicioService: ServicioService,
    private servicioDetalleService: ServicioDetalleService,
    private clienteService: ClienteService,
    private vehiculoService: VehiculoService,
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

  //para servicio detalle
    servicio_detalle: any[] = []
    addToServicio(servicio: Servicio): void {
      // Verificar si el producto ya está en el carrito
      const existingProduct = this.servicio_detalle.find(item => item.servicio.id === servicio.id);
      if (!existingProduct) {
        // Si el producto no está en el carrito, lo agregamos con cantidad inicial de 1
        this.servicio_detalle.push({servicio});
      }
    }

    getImporteTotal(): number {
      return this.servicio_detalle.reduce((total, item) => total + (item.servicio.costo), 0);
    }
    clearCart(): void {
      this.servicio_detalle = [];
    }
    removeFromCart(item:any){
      this.servicio_detalle.splice(this.servicio_detalle.indexOf(item), 1)
    }

    getByPlaca(): void {
      if (this.placa) {
        this.vehiculoService.getByPlaca(this.placa).subscribe(
          (response) => {
            this.vehiculo = response;
          },
          (error) => {
            console.error("Error al buscar cliente:", error);
            this.cliente = undefined // Reseteamos el cliente si ocurre un error
          }
        );
      } else {
        console.warn('Por favor ingrese un DNI');
      }
    }
    

    //formulario de cliente
    openClienteModal() {
      const modalRef = this.modalService.open(ClienteFormComponent);
      modalRef.result.then((result) => {
      if (result) {
            //agregará
            this.clienteService.create(result).subscribe(
              () => {
                this.load;
              }
            )     
        }
      }).catch(() => {
      })
    }

    //formulario vehiculo
    //formulario de cliente
    openVehiculoModal() {
      const modalRef = this.modalService.open(VehiculoFormComponent);
      modalRef.result.then((result) => {
      if (result) {
            //agregará
            this.vehiculoService.create(result).subscribe(
              () => {
                this.load();
              }
            )     
        }
      }).catch(() => {
      })
    }


    registrarServicio(): void {
      // Verificar que haya un vehiculo seleccionado
      if (!this.vehiculo) {
        alert('Debe seleccionar un vehículo');
        return;
      }
    
      // Verificar que el carrito no esté vacío
      if (this.servicio_detalle.length === 0) {
        alert('No hay servicios en el carrito');
        return;
      }

      // Crear los objetos de detalle del servicio para cada servicio en el carrito
      const servicioDataDetalle = this.servicio_detalle.map(item => ({
        servicio: item.servicio.id, // ID del servicio
        vehiculo: this.vehiculo?.id,  // ID del vehículo
        fecha: new Date(),              // Fecha actual
        costototal: item.servicio.costo, // Costo de cada servicio individual (puedes cambiarlo si necesitas el costo total)     
      }));
    
      // Llamamos al servicio para crear los detalles de servicio (masivo)
      this.servicioDetalleService.create(servicioDataDetalle).subscribe(
        () => {
          // Limpiar el carrito después de guardar los servicios
          alert('Servicios registrados con éxito');   
          this.clearCart();
        },
        (error) => {
          console.error('Error al registrar los servicios', error);
          alert('Hubo un error al registrar los servicios. Intente nuevamente.');
        }
      );
    }

}
