import { Component, Input, inject, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.interface';
import { UsersService } from 'src/app/core/services/users.service';

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
    return 'assets/images/logo_circular.png';
  }

  async onClickLogout() {
    if (await confirm('¿Quieres salir de la aplicación?')) {
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
