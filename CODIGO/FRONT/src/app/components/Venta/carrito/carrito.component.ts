import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Producto } from 'src/app/models/Producto.model';
import { Cliente } from 'src/app/models/Cliente.model';
import { ProductoService } from 'src/app/services/ProductoService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteFormComponent } from '../../Cliente/cliente-form/cliente-form.component';
import { ClienteService } from 'src/app/services/ClienteService';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit{

  @ViewChild('clienteModal') ClienteModal?: ClienteFormComponent

  productos: Producto[] = [];
  carrito: any[] = []; 
  currentId?: number;
  editMode: boolean = false;
  dni: string = ''; 
  cliente: Cliente | undefined;

  constructor(
    private productoService: ProductoService, 
    private clienteService: ClienteService,
    private fb: FormBuilder, 
    private modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.loadProductos('');
  }


  loadProductos(busqueda: string | null): void {
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
          this.productos = response;
        },
        (error) => console.error('Error al cargar productos por nombre', error)
      );
    }
  }

  
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;  // Aserción de tipo
    this.loadProductos(input.value);
  }



  addToCart(producto: Producto): void {
    const existingProduct = this.carrito.find(item => item.producto.id === producto.id);
    if (existingProduct) {
      // Verificar si se excede el stock
      if (existingProduct.cantidad < producto.stock) {
        // Si no se excede el stock, incrementamos la cantidad
        existingProduct.cantidad++;
      } else {
        // Si se excede, mostramos una alerta o mensaje de error
        alert('No hay suficiente stock disponible para este producto.');
      }
    } else {
      // Si no está en el carrito, lo agregamos con cantidad 1
      if (producto.stock > 0) {
        this.carrito.push({ producto, cantidad: 1 });
      } else {
        alert('Este producto está fuera de stock.');
      }
    }
  }
  getTotal(): number {
    return this.carrito.reduce((total, item) => total + (item.producto.precio * item.cantidad), 0);
  }

  getImporteTotal(): number {
    return this.carrito.reduce((total, item) => total + (item.producto.precio * item.cantidad), 0);
  }
  
  removeFromCart(item:any){
    this.carrito.splice(this.carrito.indexOf(item), 1)
  }
  openClienteModal() {
      const modalRef = this.modalService.open(ClienteFormComponent);
      modalRef.result.then((result) => {
      if (result) {
            //agregará
            this.clienteService.create(result).subscribe(
              () => {
                this.loadProductos('');
              }
            )     
        }
      }).catch(() => {
      })
    }

  // Función para manejar la búsqueda del cliente
  getByDni(): void {
  if (this.dni) {
    this.clienteService.getByDni(this.dni).subscribe(
      (response) => {
        this.cliente = response;
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

  generarVenta():void{
    
  }

}
