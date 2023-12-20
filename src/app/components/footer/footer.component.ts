import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubscribersService } from 'src/app/core/services/subscribers.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  subscribeSuccess: boolean = false;
  subscribeFail: boolean = false;
  formSubscribe: FormGroup;

  router = inject(Router);
  subscribersService = inject(SubscribersService);
  usersService = inject(UsersService);

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
      if (!response.error) {
        this.subscribeSuccess = true;
        setTimeout(() => {
          this.subscribeSuccess = false;
        }, 1500);
      } else {
        this.subscribeFail = true;
        setTimeout(() => {
          this.subscribeFail = false;
        }, 1500);
      }

    } catch (error) {
      console.log(error);

    }

  }
}
