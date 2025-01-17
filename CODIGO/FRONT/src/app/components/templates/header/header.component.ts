import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: any;
  isAdmin: boolean = false;
  isEmpleado: boolean = false;

  constructor(private authService: AutenticacionService, private router: Router) {}

  ngOnInit(): void {
    // Nos suscribimos a los cambios del usuario autenticado
    this.authService.currentUser$.subscribe((user) => {
      this.user = user;
      if (user) {
        // Validamos el rol del usuario
        this.isAdmin = user.rol === 1; // id=1 es administrador
        this.isEmpleado = user.rol === 2; // id=2 es empleado
      }
    });
  }

  logout() {
    // Limpiar el usuario autenticado
    this.authService.clearCurrentUser();
    // Redirigir al login
    this.router.navigate(['login']);
  }
}
