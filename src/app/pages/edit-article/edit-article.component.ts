import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/core/models/category.interface';
import { ArticlesService } from 'src/app/core/services/articles.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent {

  articleId: string = '';
  formArticleEdit: FormGroup;
  allCategories: Category[] = [];
  parentCategories: Category[] = [];
  subcategories: Category[] = [];

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

  async ngOnInit() {
    this.allCategories = await this.articlesService.getAllCategories();
    this.parentCategories = this.allCategories.filter(category => !category.parent_id);

    this.activatedRoute.params.subscribe(async params => {
      this.articleId = params['articleId'];
      const response = await this.articlesService.getById(this.articleId)

      const { title, excerpt, body, url, source, caption } = response
      this.formArticleEdit.setValue({ title, excerpt, body, category_id: '', url, source, caption })
    })

  }

  onChange(event: any) {
    if (event.target.value) {
      this.subcategories = this.allCategories.filter(category => category.parent_id === Number(event.target.value))
    }
  }

  async onSubmit() {
    try {
      const response = await this.articlesService.updateById(this.articleId, this.formArticleEdit.value);
      console.log(response);
      this.router.navigate(['area-personal/articulos']);
    } catch (error) {
      console.log(error);
    }

  }

}
