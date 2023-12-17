import { Component, Input, inject, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.interface';
import { UsersService } from 'src/app/core/services/users.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  router = inject(Router);
  usersService = inject(UsersService);

  @Input() profileInfo: Pick<User, 'name' | 'image'> = {
    name: '',
    image: ''
  };

  openDropdown = false;


  ngOnInit() {
    this.loadProfileInfo();
  }

  async loadProfileInfo() {
    this.profileInfo = await this.usersService.getById();
  }

  getProfileImage(): string {

    if (this.profileInfo && this.profileInfo.image) {
      return this.profileInfo.image;
    }
    return 'assets/images/logo_cuadrado.png';
  }

  async onClickLogout() {
    const result = await Swal.fire({
      title: '¿Quieres cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    });

    if (result.isConfirmed) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  }



  onClickUnfold(event: Event) {
    event.stopPropagation();
    this.openDropdown = !this.openDropdown;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (this.openDropdown) {
      this.openDropdown = false;
    }
  }




}
