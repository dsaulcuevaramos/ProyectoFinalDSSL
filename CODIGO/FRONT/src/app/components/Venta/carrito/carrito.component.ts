import { Component, OnInit, ViewChild } from '@angular/core';
import { Producto } from 'src/app/models/Producto.model';
import { Cliente } from 'src/app/models/Cliente.model';
import { ProductoService } from 'src/app/services/ProductoService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteFormComponent } from '../../Cliente/cliente-form/cliente-form.component';
import { ClienteService } from 'src/app/services/ClienteService';
import { VentaService } from 'src/app/services/VentaService';
import { VentaDetalleService } from 'src/app/services/Venta_DetalleService'; 

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
    private modalService: NgbModal,
    private ventaService: VentaService,
    private ventaDetalleService: VentaDetalleService
  ) {
   
  }

  ngOnInit(): void {
    this.loadProductos('');
  }


  loadProductos(busqueda: string | null): void {
    if (!busqueda) {
      this.productoService.get().subscribe(
        (response) => {
          // Filtramos los productos que tienen stock
          this.productos = response.filter(producto => producto.stock > 0);
        },
        (error) => console.error('Error al cargar productos', error)
      );
    } else {
      this.productoService.getByNombre(busqueda).subscribe(
        (response) => {
          // Filtramos los productos que tienen stock
          this.productos = response.filter(producto => producto.stock > 0);
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

    esDniValido: boolean = true;
    validaDni(): void { // ojito validacion de dni
      const dniRegex = /^\d{8}$/;
      this.esDniValido = dniRegex.test(this.dni);
    }
  
    getByDni(): void {
      if (this.esDniValido && this.dni) {
        this.clienteService.getByDni(this.dni).subscribe(
          (response) => {
            this.cliente = response;
          },
          (error) => {
            console.error('Error al buscar cliente:', error);
            this.cliente = undefined;
          }
        );
      } else {
        console.warn('Por favor ingrese un DNI válido');
      }
    }
  


generarVenta(): void {
  //verificaciones antes de agrregar
  if (!this.cliente) {
    alert('Debe seleccionar un cliente');
    return;
  }
  if (this.carrito.length === 0) {
    alert('No hay productos en el carrito');
    return;
  }

  // Crear la venta con los datos del formulario
  const ventaData = {
    fecha: new Date(),
    importeTotal: this.getImporteTotal(),
    cliente: this.cliente.id
  };

  this.ventaService.create(ventaData).subscribe(
    (response) => {
      const idVenta = response.id;  // Obtener el id de la venta creada
      console.log('Venta creada con ID:', idVenta);

      this.crearDetallesVenta(idVenta);
    },
    (error) => {
      console.error('Error al crear la venta', error);
    }
  );

  this.loadProductos('');
}

crearDetallesVenta(idVenta: number): void {
  const detalles = this.carrito.map(item => ({
    cantidad: item.cantidad,
    precioUnidad: item.producto.precio,
    total: item.producto.precio * item.cantidad,
    venta: idVenta,  // Asociar el id de la venta
    producto: item.producto.id,  // Producto ID de la venta
  }));

  console.log('Detalles a enviar:', detalles);  // Verifica que todos los detalles estén correctos

  // Llamar al servicio para crear los detalles en la base de datos
  this.ventaDetalleService.create(detalles).subscribe(
    () => {
      alert('Venta realizada con éxito');
      this.updateStockProductos();  // Actualiza el stock de los productos
      this.limiezaCart();  // Limpiar el carrito
    },
    (error) => {
      console.error('Error al crear los detalles de la venta', error);
    }
  );
}

  updateStockProductos(): void {
    this.carrito.forEach(item => {
      const newStock = item.producto.stock - item.cantidad; // Nuevo stock después de la venta
  
      // Llamamos al servicio de producto para actualizar el stock
      this.productoService.updateStock(item.producto.id, newStock).subscribe(
        (response) => {
          console.log(`Stock actualizado para el producto ${item.producto.nombres}`);
        },
        (error) => {
          console.error(`Error al actualizar el stock de ${item.producto.nombres}`, error);
        }
      );
    });

  }
  limiezaCart(): void {
    this.carrito = [];
  }
}
