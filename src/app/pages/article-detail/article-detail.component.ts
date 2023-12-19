import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/core/models/article.interface';
import { Category } from 'src/app/core/models/category.interface';
import { User } from 'src/app/core/models/user.interface';
import { ArticlesService } from 'src/app/core/services/articles.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent {

  article!: Article;
  creatorInfo!: User | undefined;
  slug: string = '';
  users: User[] = [];
  publishedArray: Article[] = [];
  headlineArticle: Article | null = null;
  standardArticles: Article[] = [];
  categories: Category[] = [];
  selectedCategory: Category | null = null;

  activatedRoute = inject(ActivatedRoute);
  articlesService = inject(ArticlesService);
  usersService = inject(UsersService);
  router = inject(Router);

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {
      this.slug = params['slug'];
      this.article = await this.articlesService.getBySlug(this.slug);

      try {

        this.users = await this.usersService.getAll();
        console.log(this.users);

        if (this.article && this.article.creator_id !== undefined) {

          this.creatorInfo = this.users.find(user => user.id === this.article.creator_id);

          if (this.creatorInfo) {
            console.log('Nombre del creador:', this.creatorInfo.name);
            console.log('Imagen del creador:', this.creatorInfo.image);
          } else {
            console.warn('No se encontró el usuario con ID:', this.article.creator_id);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });

    this.publishedArray = await this.articlesService.getAllPublished();
    this.categories = await this.articlesService.getAllCategories();

    this.headlineArticle = this.publishedArray.find(article => article.headline)!;
    this.standardArticles = this.publishedArray.filter(article => !article.headline);
  }


  getCategoryName(categoryId: number | undefined): string {
    if (!categoryId) {
      return '';
    }

    const category = this.categories.find(c => c.id === categoryId);
    if (!category) {
      return '';
    }

    const categoryName = category.name;

    if (category.parent_id !== null) {
      const parentCategory = this.categories.find(c => c.id === category.parent_id);
      if (parentCategory) {
        return `${parentCategory.name} / ${categoryName}`;
      }
    }

    return categoryName;
  }
}





