import { Component, Input, inject } from '@angular/core';
import { Article } from 'src/app/core/models/article.interface';
import { ArticlesService } from 'src/app/core/services/articles.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-articles-by-user',
  templateUrl: './articles-by-user.component.html',
  styleUrls: ['./articles-by-user.component.css']
})
export class ArticlesByUserComponent {

  articlesService = inject(ArticlesService);
  usersService = inject(UsersService);

  articlesArr: Article[] = [];

  async ngOnInit(){
    try{
      this.articlesArr = await this.articlesService.getById()
    } catch (error) {
      console.log(error)
    }
  }

}
