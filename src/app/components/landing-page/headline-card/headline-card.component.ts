import { Component, Input, inject } from '@angular/core';
import { Article } from 'src/app/core/models/article.interface';
import { User } from 'src/app/core/models/user.interface';
import { ArticlesService } from 'src/app/core/services/articles.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-headline-card',
  templateUrl: './headline-card.component.html',
  styleUrls: ['./headline-card.component.css']
})
export class HeadlineCardComponent {
  @Input() article: Pick<Article, 'title' | 'excerpt' | 'url' | 'slug'> = {
    title: '',
    excerpt: '',
    url: '',
    slug: ''
  };

  userInfo!: User;
  articleInfo!: Article;
  usersService = inject(UsersService);
  articlesService = inject(ArticlesService)


  async ngOnInit() {
    this.userInfo = await this.usersService.getById();
  }

  async onClick() {
    try {
      const slug = this.article.slug;
      const newHeadlineValue = false;
      const response = await this.articlesService.updateHeadline(slug, newHeadlineValue);
      console.log('Actualización exitosa:', response);
      setTimeout(() => {
        window.location.reload();
      }, 0);
    } catch (error) {
      console.error('Error al actualizar el titular:', error);
    }
  }

}
