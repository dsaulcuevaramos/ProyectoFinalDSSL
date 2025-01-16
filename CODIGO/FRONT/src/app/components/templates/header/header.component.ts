import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  user: any;

  constructor(private authService: AutenticacionService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.user = user;
    });
  }
}
