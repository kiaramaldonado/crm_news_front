import { Component, Input } from '@angular/core';
import { Article } from 'src/app/core/models/article.interface';
import { Category } from 'src/app/core/models/category.interface';

@Component({
  selector: 'app-standard-card',
  templateUrl: './standard-card.component.html',
  styleUrls: ['./standard-card.component.css']
})
export class StandardCardComponent {
  @Input() article: Pick<Article, 'title' | 'excerpt' | 'url' | 'category_id'> = {
    title: '',
    excerpt: '',
    url: '',
    category_id: 1,
  };

  categories: Category[] = [];

  getCategoryRoute(categoryId: number): string {
    const category = this.categories.find(c => c.id === categoryId);
    if (category) {
      return category.name.toLowerCase().replace(/[,\s]+/g, '-');
    } else {
      return '';
    }
  }

  transformTitle(title: string): string {
    return title.toLowerCase().replace(/[,\s]+/g, '-');
  }
}
