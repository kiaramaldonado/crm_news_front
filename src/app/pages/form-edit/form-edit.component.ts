import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as dayjs from 'dayjs';
import { UsersService } from 'src/app/core/services/users.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.css']
})
export class FormEditComponent {

  editForm: FormGroup;
  submitted: boolean = false;

  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  usersService = inject(UsersService);

  constructor() {
    this.editForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      date_of_birth: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      image: new FormControl(),
    }, [])
  }

  async ngOnInit() {
    const response = await this.usersService.getById();

    let { name, password, role, date_of_birth, phone, image } = response;
    date_of_birth = dayjs(date_of_birth).format('YYYY-MM-DD');
    this.editForm.setValue({ name, password, role, date_of_birth, phone, image });
  };


  async onSubmit() {
    this.submitted = true;
    if (this.editForm.valid) {
      try {
        await this.usersService.updateById(this.editForm.value);
        this.router.navigate(['/area-personal']);

        Swal.fire({
          icon: 'success',
          title: 'Perfil editado',
          showConfirmButton: false,
          timer: 1500
        });

        setTimeout(() => {
          window.location.reload();
        }, 0);
      } catch (error) {
        console.log(error);
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error al editar'
        });
      }
    }
  }
}



