import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Producto } from 'src/app/models/Producto.model';
import { ProductoService } from 'src/app/services/ProductoService';
import { ProductoFormComponent } from '../producto-form/producto-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.css']
})
export class ProductoListComponent implements OnInit {

  //nos brinda infromacion del modal
  @ViewChild('productoModal') ProductoModal?: ProductoFormComponent

  productos: Producto[] = [];
  productoForm: FormGroup;
  currentId?: number;
  editMode: boolean = false;

  constructor(private productoService: ProductoService,
    private fb: FormBuilder, private modalService: NgbModal
  ) {

    this.productoForm = this.fb.group({
      nombres: [''],
      descripcion: [''],
      precio: [''],
      stock: [''],
      estado: false,
    })
  }

  ngOnInit(): void {
    this.load('');
  }

  //listar
  load(busqueda: string | null): void {
    if (!busqueda) {
      this.productoService.get().subscribe(
        (response) => {
          this.productos = response;
        },
        (error) => console.error('Error al cargar productos', error)
      );
    } else {
      this.productoService.getByNombre(busqueda).subscribe(
        (response) => {
          // Filtramos los productos que tienen stock
          this.productos = response;
        },
        (error) => console.error('Error al cargar productos por nombre', error)
      );
    }
  }
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;  // Aserción de tipo
    this.load(input.value);
  }

  
  //abre el modal del form component
  openModal(producto?: Producto) {
    const modalRef = this.modalService.open(ProductoFormComponent);

    //esto es para saber si va crear o editar
    if (producto) {
      modalRef.componentInstance.producto = producto;
      modalRef.componentInstance.isEditMode = true;
    }
    modalRef.result.then((result) => {
      if (result) {
        if (result.id) {
          //actualiza si hay datos
          this.productoService.update(result.id, result).subscribe(
            () => {
              this.load('');
              this.resetFrom();
            })
        } else {
          //agregará
          this.productoService.create(result).subscribe(
            () => {
              this.load('');
              this.resetFrom();
            }
          )
        }
      }
    }).catch(() => {
      //modal dismissed
    })
  }
  resetFrom() {
    this.productoForm.reset();
  }


  //editar
  edit(producto: any) {
    const modalElement = document.getElementById('prodcutoModal');

    this.currentId = producto.id;
    this.productoForm.patchValue(producto);
    this.editMode = true;
  }

  //eliminar
  delete(id: number) {
    const confirmacion = confirm("¿estas seguro?");
    if (confirmacion) {
      this.productoService.delete(id).subscribe(() => {
        this.load('');
      })
    }
  }


  //agregar
  onSubmit() {
    console.log("onSubmit", this.productoForm.value);
    if (this.editMode && this.currentId) {
      this.productoService.update(this.currentId,
        this.productoForm).subscribe(
          () => {
            this.load('');
            this.resetFrom();
          }
        )
    } else {
      this.productoService.create(this.productoForm.value).subscribe(
        () => {
          this.load('');
          this.resetFrom();
        }
      )
    }
  }
}
