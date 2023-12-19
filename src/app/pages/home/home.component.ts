import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/core/models/article.interface';
import { Category } from 'src/app/core/models/category.interface';
import { ArticlesService } from 'src/app/core/services/articles.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  publishedArray: Article[] = [];
  headlineArticle: Article | null = null;
  standardArticles: Article[] = [];
  categories: Category[] = [];
  categorySelected: string = '';
  originalCategoryName: string = '';
  articlesService = inject(ArticlesService);
  activatedRoute = inject(ActivatedRoute);


  async ngOnInit() {


    this.activatedRoute.params.subscribe(async (params: any) => {
      console.log(params);
      this.categories = await this.articlesService.getAllCategories();
      console.log('Categorías:', this.categories);

      if (Object.keys(params).length === 0) {
        console.log('no hay params');
        this.publishedArray = await this.articlesService.getAllPublished();
        console.log('Artículos publicados:', this.publishedArray);



        this.headlineArticle = this.publishedArray.find(article => article.headline)!;
        this.standardArticles = this.publishedArray.filter(article => !article.headline);
        console.log(this.standardArticles);

      } else {
        this.headlineArticle = null;



        try {
          this.categorySelected = params.category;
          let category_selected = this.categories.find((category) => {
            return category.name.toLowerCase().replace(/[,\s]+/g, '-').normalize("NFD").replace(/[\u0300-\u036f"'`´‘’“”:]/g, "") === params.category.toLowerCase().replace(/[,\s]+/g, '-').normalize("NFD").replace(/[\u0300-\u036f"'`´‘’“”:]/g, "");

          });
          if (category_selected) {
            this.originalCategoryName = category_selected.name;
            this.standardArticles = await this.articlesService.getByCategoryId(category_selected!.id);
            console.log('Artículos filtrados por categoría:', this.standardArticles);
          }



        } catch (error) {
          console.error('Error al filtrar por categoría:', error);
        }
      }


    });
  }



  async filterByCategory(category: Category | null) {
    console.log(category);


    if (category) {
      if (category.parent_id === null) {
        const allArticles = await this.articlesService.getByParentCategory(category.id);
        this.standardArticles = allArticles.filter(article => article.status === 'publicado');
      } else {
        this.standardArticles = this.publishedArray.filter(article =>
          article.category_id === category.id && article.status === 'publicado');
      }
    } else {
      // this.standardArticles = this.publishedArray.filter(article =>
      //   article.status === 'publicado');
      this.standardArticles = this.publishedArray;
    }

  }
}

