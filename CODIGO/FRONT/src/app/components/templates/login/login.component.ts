import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario.model';
import { FormBuilder , FormGroup, NgForm, Validators} from '@angular/forms'; 
import { Router } from '@angular/router'; 
import { AutenticacionService } from 'src/app/services/autenticacion.service'; 
import { UsuarioService } from 'src/app/services/UsuarioService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

    usuario: Usuario | undefined;
    usuarioForm!: FormGroup; 

     constructor(
      private autenticacionService: AutenticacionService,
      private usuarioService: UsuarioService,
      private router: Router,
      private fb : FormBuilder
      ){}

    ngOnInit(): void {
      this.usuarioForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      })
    }


    login() {
      if (this.usuarioForm.valid) {
        this.usuarioService.getForLogin(this.usuarioForm.value.username).subscribe(
          (response) => {
            if (this.usuarioForm.value.password == response.password) {
              this.autenticacionService.setCurrentUser(response); // Guardamos el usuario con su rol
              this.usuarioForm.reset();
              this.router.navigate(['home']);
            } else {
              alert('Contraseña Incorrecta');
              this.usuarioForm.controls['password'].reset();
            }
          },
          (error) => {
            alert('Ocurrió un error');
            this.usuarioForm.reset();
          }
        )
      } else {
        alert('Por favor, complete todos los campos');
      }
    }

}
