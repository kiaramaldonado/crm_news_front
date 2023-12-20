import { Component, inject } from '@angular/core';
import { User } from 'src/app/core/models/user.interface';
import { ArticlesService } from 'src/app/core/services/articles.service';
import { ImagesService } from 'src/app/core/services/images.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  articlesService = inject(ArticlesService);
  usersService = inject(UsersService);
  imagesService = inject(ImagesService);

  userLogged!: User;
  displayName: string | undefined;


  async ngOnInit() {
    try {
      this.userLogged = await this.usersService.getById();
      if (this.userLogged.name) {
        const nameParts = this.userLogged.name.split(' ');
        this.displayName = nameParts[0];
      } else {
        this.displayName = undefined;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
