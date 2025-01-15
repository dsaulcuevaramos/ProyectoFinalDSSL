import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario.model';
import { FormBuilder , FormGroup, NgForm, Validators} from '@angular/forms'; 
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

    usuario: Usuario | undefined;
    usuarioForm!: FormGroup; 

     constructor(
        private fb: FormBuilder,
        private router: Router
      ){}

    ngOnInit(): void {
      this.usuarioForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      })
    }


    login(){
      if (this.usuarioForm.valid) {
        const { username, password } = this.usuarioForm.value;
  
        // Validación simple: puedes personalizarla o usar un backend real
        if (username === 'hola' && password === 'mundo') {
          this.router.navigate(['home']);
        } else {
          alert('Usuario o contraseña incorrectos');
        }
      } else {
        alert('Por favor, complete todos los campos');
      }
    }

}
