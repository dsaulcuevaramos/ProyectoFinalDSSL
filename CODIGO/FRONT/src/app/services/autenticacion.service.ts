import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private currentUser = new BehaviorSubject<any>(null); // Almacena el usuario autenticado
  currentUser$ = this.currentUser.asObservable(); // Observable para que otros componentes puedan suscribirse

  constructor() { }

  setCurrentUser(user: any): void {
    this.currentUser.next(user); // Actualiza el usuario autenticado
  }

  getCurrentUser(): any {
    return this.currentUser.getValue(); // Obtiene el usuario actual
  }

  clearCurrentUser(): void {
    this.currentUser.next(null); // Limpia el usuario autenticado
  }

}
