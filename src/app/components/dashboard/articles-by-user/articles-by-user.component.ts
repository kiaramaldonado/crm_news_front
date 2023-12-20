import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/core/models/article.interface';
import { User } from 'src/app/core/models/user.interface';
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
  activatedRoute = inject(ActivatedRoute);

  articlesArr: any[] = [];
  @Input() user!: User;
  arrFiltrado: any;
  status: string = '';
  newFiltrado: any[] = []


  async ngOnInit() {
    try {
      this.user = await this.usersService.getById();
      this.articlesArr = await this.articlesService.getByUser();
      this.articlesArr = await this.filtrarStatus();
      this.arrFiltrado = this.articlesArr.reverse();
      this.newFiltrado = [...new Map(this.arrFiltrado.map((item: { id: number; }) => [item.id, item])).values()];
      
      console.log(this.newFiltrado);
      
    } catch (error) {
      console.log(error);
    }
  }



  async filtrarStatus() {
    if (this.user && this.user.role === 'editor') {
      return this.articlesArr.filter(article => article.status === "revision");
    } else {
      return this.articlesArr.filter(article => article.status === "borrador");
    }
  }
}



      

