import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/core/models/category.interface';
import { ArticlesService } from 'src/app/core/services/articles.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent {

  newArticle: FormGroup;
  allCategories: Category[] = [];
  parentCategories: Category[] = [];
  subcategories: Category[] = [];
  maxTitleLength: number = 300;

  articlesService = inject(ArticlesService);
  router = inject(Router);


  async ngOnInit() {
    this.allCategories = await this.articlesService.getAllCategories();
    this.parentCategories = this.allCategories.filter(category => !category.parent_id);
  }

  constructor() {
    this.newArticle = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      excerpt: new FormControl(null, [Validators.required]),
      body: new FormControl(null, [Validators.required]),
      category_id: new FormControl('', [Validators.required]),
      url: new FormControl(null, [Validators.required]),
      source: new FormControl(null, [Validators.required]),
      caption: new FormControl(null, [Validators.required]),
    }, [])
  }

  onChange(event: any) {
    if (event.target.value) {
      this.subcategories = this.allCategories.filter(category => category.parent_id === Number(event.target.value));
    }
  }

  onTitleChange(event: any): void {
    const titleControl = this.newArticle.get('title');
    if (titleControl && titleControl.value && titleControl.value.length > this.maxTitleLength) {
      titleControl.setValue(titleControl.value.substring(0, this.maxTitleLength));
    }
  }

  checkError(controlName: string, errorName: string) {
    return this.newArticle.get(controlName)?.hasError(errorName) && this.newArticle.get(controlName)?.touched;
  }

  async onSubmit() {
    try {
      const response = await this.articlesService.createArticle(this.newArticle.value);
      console.log(response);
      this.router.navigate(['/area-personal']);
      this.newArticle.reset();
      await Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Artículo creado",
        showConfirmButton: false,
        timer: 1500
      })
    } catch (e: any) {
      console.log(e);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "El artículo no ha sido creado"
      })
    }
  }

}
