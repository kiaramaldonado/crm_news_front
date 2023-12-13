import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from 'src/app/core/services/articles.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent {

  articleId: string = '';
  formArticleEdit: FormGroup;

  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  articlesService = inject(ArticlesService);

  constructor() {
    this.formArticleEdit = new FormGroup({
      title: new FormControl(),
      excerpt: new FormControl(),
      body: new FormControl(),
      category_id: new FormControl(),
      url: new FormControl(),
      source: new FormControl(),
      caption: new FormControl()
    }, [])
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {
      this.articleId = params['articleId'];
      const response = await this.articlesService.getById(this.articleId)

      const { title, excerpt, body, category_id, url, source, caption } = response
      this.formArticleEdit.setValue({ title, excerpt, body, category_id, url, source, caption })
    })
  }

  async onSubmit() {
    const response = await this.articlesService.updateById(this.articleId, this.formArticleEdit.value);
    console.log(response);

  }

}
