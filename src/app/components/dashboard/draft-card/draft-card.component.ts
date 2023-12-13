import { Component, Input } from '@angular/core';
import { Article } from 'src/app/core/models/article.interface';

@Component({
  selector: 'app-draft-card',
  templateUrl: './draft-card.component.html',
  styleUrls: ['./draft-card.component.css']
})
export class DraftCardComponent {

  @Input() oneArticle!: Article;

}
