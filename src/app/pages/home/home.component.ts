import { Component, inject } from '@angular/core';
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
    this.fetchCategories();

    this.headlineArticle = this.publishedArray.find(article => article.headline)!;
    this.standardArticles = this.publishedArray.filter(article => !article.headline);
  }

  async fetchCategories() {
    this.categories = await this.articlesService.getAllCategories();
  }

  filterByCategory(category: Category | null) {
    this.selectedCategory = category;
    if (category) {
      this.standardArticles = this.publishedArray.filter(article => article.category_id === category.id && !article.headline);
    } else {
      this.standardArticles = this.publishedArray.filter(article => !article.headline);
    }
  }

}
