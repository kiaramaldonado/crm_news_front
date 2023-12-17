import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.interface';

@Component({
  selector: 'app-dashboard-navbar',
  templateUrl: './dashboard-navbar.component.html',
  styleUrls: ['./dashboard-navbar.component.css']
})
export class DashboardNavbarComponent {

// router = inject(Router);
@Input() userLogged!: User;

  
// status: string = ''; // Agrega una propiedad para almacenar el estado actual


//   updateStatus(status: string) {
//     this.status = status; // Actualiza la propiedad de estado
//     this.router.navigate(['/area-personal/articulos', status]);
//   }
}
