import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-form-registration',
  templateUrl: './form-registration.component.html',
  styleUrls: ['./form-registration.component.css']
})
export class FormRegistrationComponent {

  registerForm: FormGroup;
  submitted: boolean = false;
  usernameExists: boolean = false;
  emailExists: boolean = false;

  constructor(private fb: FormBuilder, private usersService: UsersService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, this.emailDomainValidator]],
      password: ['', Validators.required],
      repite_password: ['', Validators.required],
      role: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      phone: ['', Validators.required],
      image: [''],
    }, { validators: this.passwordRepeatValidator });

  }

  async checkUsernameExists() {
    const username = this.registerForm.get('username')?.value;
    if (username) {
      this.usernameExists = await this.usersService.checkUsernameExists(username);
    }
  }

  async checkEmailExists() {
    const email = this.registerForm.get('email')?.value;
    if (email) {
      this.emailExists = await this.usersService.checkEmailExists(email);
    }
  }

  emailDomainValidator(control: AbstractControl): ValidationErrors | null {
    const email = control.value as string;

    if (email && !email.endsWith('@guirre.com')) {
      return { emaildomain: true };
    }
    return null;
  }

  passwordRepeatValidator(form: AbstractControl) {
    const passwordValue = form.get('password')?.value;
    const repitePasswordValue = form.get('repite_password')?.value;
    if (passwordValue === repitePasswordValue) {
      form.get('repite_password')?.setErrors(null);
      return null;
    }

    form.get('repite_password')?.setErrors({ passwordrepeatvalidator: true });
    return { passwordrepeatvalidator: true };
  }

  clearErrors() {
    this.registerForm.get('password')?.setErrors(null);
    this.registerForm.get('repite_password')?.setErrors(null);
    this.submitted = false;
  }

  async onSubmit() {
    this.submitted = true;
    await this.checkUsernameExists();
    await this.checkEmailExists();

    if (this.registerForm.valid && !this.usernameExists && !this.emailExists) {
      const response = await this.usersService.registration(this.registerForm.value);
      console.log(response);

      this.registerForm.reset();
      this.router.navigate(['/login']);
    }
  }

}
