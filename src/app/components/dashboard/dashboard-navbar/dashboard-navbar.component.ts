import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-navbar',
  templateUrl: './dashboard-navbar.component.html',
  styleUrls: ['./dashboard-navbar.component.css']
})
export class DashboardNavbarComponent {

router = inject(Router);

  
// status: string = ''; // Agrega una propiedad para almacenar el estado actual


//   updateStatus(status: string) {
//     this.status = status; // Actualiza la propiedad de estado
//     this.router.navigate(['/area-personal/articulos', status]);
//   }
}
