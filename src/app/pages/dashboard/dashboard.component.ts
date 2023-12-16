import { Component, inject } from '@angular/core';
import { Article } from 'src/app/core/models/article.interface';
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


  async ngOnInit() {
    try {
      this.userLogged = await this.usersService.getById();
      console.log(this.userLogged);
    } catch (error) {
      console.log(error);
    }
  }
}
