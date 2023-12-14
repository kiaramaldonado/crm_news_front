import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Category } from 'src/app/core/models/category.interface';
import { ArticlesService } from 'src/app/core/services/articles.service';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent {

  newArticle: FormGroup;
  articlesService = inject(ArticlesService);
  allCategories: Category[] = [];
  parentCategories: Category[] = [];
  subcategories: Category[] = [];


  async ngOnInit() {
    this.allCategories = await this.articlesService.getAllCategories();
    this.parentCategories = this.allCategories.filter(category => !category.parent_id);
  }

  constructor() {
    this.newArticle = new FormGroup({
      title: new FormControl(),
      excerpt: new FormControl(),
      body: new FormControl(),
      category_id: new FormControl(''),
      url: new FormControl(),
      source: new FormControl(),
      caption: new FormControl()
    }, [])
  }

  onChange(event: any) {
    if (event.target.value) {
      this.subcategories = this.allCategories.filter(category => category.parent_id === Number(event.target.value));
    }
  }

  async onSubmit() {
    try {
      const response = await this.articlesService.createArticle(this.newArticle.value);
      console.log(response);
      this.newArticle.reset();
    } catch (e: any) {
      console.log(e);
    }
  }


}
