import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.css']
})
export class FormEditComponent {

  editForm: FormGroup;
  userId: string = '';

  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  usersService = inject(UsersService);

  constructor() {
    this.editForm = new FormGroup({
      name: new FormControl(),
      password: new FormControl(),
      role: new FormControl(),
      date_of_birth: new FormControl(),
      phone: new FormControl(),
      image: new FormControl(),
    })
  }

  async ngOnInit() {

    const response = await this.usersService.getById();

    const { name, password, role, date_of_birth, phone, image } = response;
    this.editForm.setValue({ name, password, role, date_of_birth, phone, image });
  };


  async onSubmit() {
    const response = await this.usersService.updateById(this.editForm.value);
    this.router.navigate(['/area-personal']);


  }
}



