import { identifierName } from '@angular/compiler';
import { Component, Input, inject } from '@angular/core';
import { User } from 'src/app/core/models/user.interface';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-dashboard-equipo',
  templateUrl: './dashboard-equipo.component.html',
  styleUrls: ['./dashboard-equipo.component.css']
})
export class DashboardEquipoComponent {

  usersService = inject(UsersService);

  users: User[] = [];
  userLogged!:User;
  teamMates: User[] = []

  async ngOnInit(){
    try {
      this.userLogged = await this.usersService.getById();
      this.users = await this.usersService.getAll();
      this.teamMates = this.users.filter(user => user.id !== this.userLogged.id)

    } catch (error) {
      console.log(error);
    }
  }

}
