import { Component, Input } from '@angular/core';
import { Article } from 'src/app/core/models/article.interface';

@Component({
  selector: 'app-standard-card',
  templateUrl: './standard-card.component.html',
  styleUrls: ['./standard-card.component.css']
})
export class StandardCardComponent {

  @Input() article: Pick<Article, 'title' | 'excerpt' | 'url' | 'category_id' | 'slug'> = {
    title: '',
    excerpt: '',
    url: '',
    category_id: 1,
    slug: '',
  };
}