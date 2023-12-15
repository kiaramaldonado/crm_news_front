import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/core/models/article.interface';
import { Category } from 'src/app/core/models/category.interface';
import { ArticlesService } from 'src/app/core/services/articles.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  publishedArray: Article[] = [];
  headlineArticle: Article | null = null;
  standardArticles: Article[] = [];
  categories: Category[] = [];
  selectedCategory: Category | null = null;
  articlesService = inject(ArticlesService);

  async ngOnInit() {
    this.publishedArray = await this.articlesService.getAllPublished();
    this.categories = await this.articlesService.getAllCategories();

    this.headlineArticle = this.publishedArray.find(article => article.headline)!;
    this.standardArticles = this.publishedArray.filter(article => !article.headline);
  }

  async filterByCategory(category: Category | null) {
    this.selectedCategory = category;

    if (category) {
      if (category.parent_id === null) {
        const allArticles = await this.articlesService.getByParentCategory(category.id);
        this.standardArticles = allArticles.filter(article => article.status === 'publicado');
      } else {
        this.standardArticles = this.publishedArray.filter(article =>
          article.category_id === category.id && article.status === 'publicado');
      }
    } else {
      this.standardArticles = this.publishedArray.filter(article =>
        article.status === 'publicado');
    }

  }
}
