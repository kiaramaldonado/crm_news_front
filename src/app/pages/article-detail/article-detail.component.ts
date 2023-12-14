import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/core/models/article.interface';
import { ArticlesService } from 'src/app/core/services/articles.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent {

  article!: Article;
  activatedRoute = inject(ActivatedRoute);
  articlesService = inject(ArticlesService);

  ngOnInit() {
    this.activatedRoute.params.subscribe(async params => this.article = await this.articlesService.getById(parseInt(params['articleId'])))
  }


}
