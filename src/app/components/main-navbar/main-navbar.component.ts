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

}
