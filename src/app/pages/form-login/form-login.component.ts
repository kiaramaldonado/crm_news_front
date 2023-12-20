import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent {

  loginForm: FormGroup;
  usersService = inject(UsersService);
  router = inject(Router);
  submitted = false;
  error: string = '';
  showPassword = false;

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async onSubmit() {
    this.submitted = true;
    const response = await this.usersService.login(this.loginForm.value);

    if (!response.error) {
      localStorage.setItem('token', response.token);

      await Swal.fire({
        icon: 'success',
        title: 'Sesión iniciada correctamente',
        showConfirmButton: false,
        timer: 1500
      });

      this.router.navigate(['/area-personal']);
    } else {
      this.error = 'Credenciales inválidas. Por favor, verifica tu correo electrónico y contraseña.';
      await Swal.fire({
        icon: 'error',
        title: 'Error de inicio de sesión',
        text: this.error,
        confirmButtonText: 'OK',
        confirmButtonColor: '#ffc720',
      });
    }
  }
}
