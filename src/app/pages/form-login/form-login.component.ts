import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent {

  loginForm: FormGroup;
  usersService = inject(UsersService);
  router = inject(Router);

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    })

  }

  async onSubmit() {
    const response = await this.usersService.login(this.loginForm.value);
    console.log(response);
    if (!response.error) {
      localStorage.setItem('token', response.token);
    }
    this.router.navigate(['/area-personal'])
  }

}
