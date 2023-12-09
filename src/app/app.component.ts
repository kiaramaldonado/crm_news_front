import { Component, inject } from '@angular/core';
import { User } from './core/models/user.interface';
import { UsersService } from './core/services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // TODO: Eliminar de app.component y trasladar al componente correspondiente
  usersArray: User[] = [];

  usersService = inject(UsersService);

  async ngOnInit() {
    try {
      this.usersArray = await this.usersService.getAll();
      console.log(this.usersArray);

    } catch (error) {
      console.log(error)
    }
  }
}
