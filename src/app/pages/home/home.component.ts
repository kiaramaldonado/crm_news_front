import { Component, inject } from '@angular/core';
import { Article } from 'src/app/core/models/article.interface';
import { ArticlesService } from 'src/app/core/services/articles.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  publishedArray: Article[] = [];
  articlesService = inject(ArticlesService);

  async ngOnInit() {
    this.publishedArray = await this.articlesService.getAllPublished();
  }

}
