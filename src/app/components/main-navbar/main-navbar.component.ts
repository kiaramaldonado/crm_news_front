import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubscribersService } from 'src/app/core/services/subscribers.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.css']
})
export class MainNavbarComponent {

  router = inject(Router);
  usersService = inject(UsersService);
  subscribersService = inject(SubscribersService);
  subscribeSuccess: boolean = false;
  formSubscribe: FormGroup;

  constructor() {
    this.formSubscribe = new FormGroup({
      email: new FormControl(null, [Validators.required])
    }, [])
  }


  async onSubmit() {

    try {
      const response = await this.subscribersService.subscribe(this.formSubscribe.value);
      console.log(response);
      this.formSubscribe.reset();
      this.subscribeSuccess = true;

      setTimeout(() => {
        this.subscribeSuccess = false;
      }, 1000);

    } catch (error) {
      console.log(error);

    }

  }

}
