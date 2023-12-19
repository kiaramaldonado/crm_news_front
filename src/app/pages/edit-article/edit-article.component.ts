import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/core/models/category.interface';
import { ArticlesService } from 'src/app/core/services/articles.service';

import Swal from 'sweetalert2';

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
  maxLength: number = 0;

  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  articlesService = inject(ArticlesService);


  constructor() {
    this.formArticleEdit = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      excerpt: new FormControl(null, [Validators.required]),
      body: new FormControl(null, [Validators.required]),
      category_id: new FormControl(null, [Validators.required]),
      url: new FormControl(null, [Validators.required]),
      source: new FormControl(null, [Validators.required]),
      caption: new FormControl(null, [Validators.required])
    }, [])
  }

  async ngOnInit() {
    this.allCategories = await this.articlesService.getAllCategories();
    this.parentCategories = this.allCategories.filter(category => !category.parent_id);

    this.activatedRoute.params.subscribe(async params => {
      this.articleId = params['articleId'];
      const response = await this.articlesService.getById(this.articleId);

      const { title, excerpt, body, url, source, caption } = response
      this.formArticleEdit.setValue({ title, excerpt, body, category_id: '', url, source, caption })
    })

  }

  onChange(event: any) {
    if (event.target.value) {
      this.subcategories = this.allCategories.filter(category => category.parent_id === Number(event.target.value))
    }
  }

  onFieldChange(fieldName: string, event: any, maxLength: number): void {
    const fieldControl = this.formArticleEdit.get(fieldName);

    if (fieldControl && fieldControl.value && fieldControl.value.length > maxLength) {
      fieldControl.setValue(fieldControl.value.substring(0, maxLength));
    }
  }

  checkError(controlName: string, errorName: string) {
    return this.formArticleEdit.get(controlName)?.hasError(errorName) && this.formArticleEdit.get(controlName)?.touched;
  }

  async onSubmit() {
    try {
      const response = await this.articlesService.updateById(this.articleId, this.formArticleEdit.value);
      console.log(response);

      await Swal.fire({
        icon: 'success',
        title: 'Artículo editado',
        showConfirmButton: false,
        timer: 1500
      });

      this.router.navigate(['area-personal/articulos']);
    } catch (error) {
      console.log(error);

      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La edición del artículo ha fallado'
      });


    }
  }
}
