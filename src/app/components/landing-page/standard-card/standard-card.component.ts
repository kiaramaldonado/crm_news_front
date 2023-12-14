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

  transformTitle(title: string): string {
    return title.toLowerCase().replace(/[,\s]+/g, '-');
  }
}
