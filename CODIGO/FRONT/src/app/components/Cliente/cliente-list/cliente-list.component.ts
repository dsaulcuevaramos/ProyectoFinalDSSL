import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Cliente } from 'src/app/models/Cliente.model';
import { ClienteService } from 'src/app/services/ClienteService';
import { ClienteFormComponent } from '../cliente-form/cliente-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {
  
  //nos brinda infromacion del modal
  @ViewChild('clienteModal') ClienteModal?: ClienteFormComponent

  clientes: Cliente[] = [];
  clienteForm: FormGroup;
  currentId?: number;
  editMode: boolean = false;

  constructor(private clienteService: ClienteService,
    private fb: FormBuilder, private modalService: NgbModal
  ) {

    this.clienteForm = this.fb.group({
      nombres: [''],
      apellidos: [''],
      dni: [''],
    })
  }

  ngOnInit(): void {
    this.load();
  }

  //abre el modal del form component
  openModal(cliente?: Cliente) {
    const modalRef = this.modalService.open(ClienteFormComponent);
    //esto es para saber si va crear o editar
    if (cliente) {
      modalRef.componentInstance.cliente = cliente;
      modalRef.componentInstance.isEditMode = true;
    }
    modalRef.result.then((result) => {
      if (result) {
        if (result.id) {
          //actualiza si hay datos
          this.clienteService.update(result.id, result).subscribe(
            () => {
              this.load();
              this.resetFrom();
            })
        } else {
          //agregará
          this.clienteService.create(result).subscribe(
            () => {
              this.load();
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
    this.clienteForm.reset();
  }

  //listar
  load(): void {
    this.clienteService.get().subscribe(
      (response) => this.clientes = response,
      (error) => console.error("error en el loading", error)
    )
  }

  //editar
  edit(cliente: any) {
    const modalElement = document.getElementById('clienteModal');

    this.currentId = cliente.id;
    this.clienteForm.patchValue(cliente);
    this.editMode = true;
  }

  //eliminar
  delete(id: number) {
    const confirmacion = confirm("¿estas seguro?");
    if (confirmacion) {
      this.clienteService.delete(id).subscribe(() => {
        this.load();
      })
    }
  }


  //agregar
  onSubmit() {
    console.log("onSubmit", this.clienteForm.value);
    if (this.editMode && this.currentId) {
      this.clienteService.update(this.currentId,
        this.clienteForm).subscribe(
          () => {
            this.load();
            this.resetFrom();
          }
        )
    } else {
      this.clienteService.create(this.clienteForm.value).subscribe(
        () => {
          this.load();
          this.resetFrom();
        }
      )
    }
  }


}
