import { Component, Input, inject } from '@angular/core';
import { Article } from 'src/app/core/models/article.interface';
import { User } from 'src/app/core/models/user.interface';
import { ArticlesService } from 'src/app/core/services/articles.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css']
})
export class HomeDashboardComponent {

  @Input() user!: User;

  articlesArr: Article[] = [];
  lastAsign: any[] = [];

  articlesService = inject(ArticlesService);
  usersService = inject(UsersService);

  async ngOnInit() {
    try {
      this.user = await this.usersService.getById();
      this.articlesArr = await this.articlesService.getByUser();
      this.articlesArr = (await this.filterStatus()).reverse()
      const newFiltered = [...new Map(this.articlesArr.map((item: { id: number; }) => [item.id, item])).values()];
      this.lastAsign = newFiltered.slice(0, 2)

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
