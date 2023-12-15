import { Component, Input } from '@angular/core';
import { Article } from 'src/app/core/models/article.interface';

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


}
