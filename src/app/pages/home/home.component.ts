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
  filteredArray: Article[] = [];
  categories: Category[] = [];
  selectedCategory: Category | null = null;
  articlesService = inject(ArticlesService);

  async ngOnInit() {
    this.publishedArray = await this.articlesService.getAllPublished();
    this.fetchCategories();
    this.filteredArray = this.publishedArray;
  }

  async fetchCategories() {
    this.categories = await this.articlesService.getAllCategories();
  }

  filterByCategory(category: Category | null) {
    this.selectedCategory = category;
    if (category) {
      this.filteredArray = this.publishedArray.filter(article => article.category_id === category.id);
    } else {
      this.filteredArray = this.publishedArray;
    }
  }

}
