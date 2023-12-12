import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  router = inject(Router);
  usersService = inject(UsersService);

  async onClickLogout() {
    if (await confirm('¿Quieres salir de la aplicación?')) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  }

  openDropdown = false;

  onClickUnfold() {
    this.openDropdown = !this.openDropdown;
  }

}
