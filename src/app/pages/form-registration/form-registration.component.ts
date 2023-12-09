import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-form-registration',
  templateUrl: './form-registration.component.html',
  styleUrls: ['./form-registration.component.css']
})
export class FormRegistrationComponent {

  registerForm: FormGroup;
  usersService = inject(UsersService);
  router = inject(Router);

  constructor() {
    this.registerForm = new FormGroup({
      name: new FormControl(),
      username: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      role: new FormControl(),
      date_of_birth: new FormControl(),
      phone: new FormControl(),
      image: new FormControl(),
    })
  }

  async onSubmit() {
    const response = await this.usersService.registration(this.registerForm.value);
    console.log(response);
    this.registerForm.reset();
    this.router.navigate(['/login']);
  }

}
