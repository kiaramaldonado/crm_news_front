import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/models/user.interface';
import { ArticlesService } from 'src/app/core/services/articles.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-articles-by-user',
  templateUrl: './articles-by-user.component.html',
  styleUrls: ['./articles-by-user.component.css']
})
export class ArticlesByUserComponent {

  @Input() user!: User;

  articlesArr: any[] = [];
  arrFiltered: any;
  status: string = '';
  newFiltered: any[] = []

  articlesService = inject(ArticlesService);
  usersService = inject(UsersService);
  activatedRoute = inject(ActivatedRoute);


  async ngOnInit() {
    try {
      this.user = await this.usersService.getById();
      this.articlesArr = await this.articlesService.getByUser();
      this.articlesArr = await this.filterStatus();
      this.arrFiltered = this.articlesArr.reverse();
      this.newFiltered = [...new Map(this.arrFiltered.map((item: { id: number; }) => [item.id, item])).values()];

    } catch (error) {
      console.log(error);
    }
  }

  async filterStatus() {
    if (this.user && this.user.role === 'editor') {
      return this.articlesArr.filter(article => article.status === "revision");
    } else {
      return this.articlesArr.filter(article => article.status === "borrador");
    }
  }
}

