import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  user: any;

  constructor(private authService: AutenticacionService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.user = user;
    });
  }
}
