import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/core/models/article.interface';
import { ArticlesService } from 'src/app/core/services/articles.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-articles-by-user',
  templateUrl: './articles-by-user.component.html',
  styleUrls: ['./articles-by-user.component.css']
})
export class ArticlesByUserComponent {

  articlesService = inject(ArticlesService);
  usersService = inject(UsersService);
  activatedRoute = inject(ActivatedRoute);

  articlesArr: any[] = [];
  arrFiltrado: any;
  status: string = '';
 

   async ngOnInit() {
    try {
      this.articlesArr = await this.articlesService.getByUser();
      this.activatedRoute.params.subscribe(params => { this.status = params['status'];
      console.log(this.status);
      
    //   if (this.status) {
    //     this.arrFiltrado = this.articlesService.getByStatus(this.status);
    //     console.log(this.arrFiltrado);
  
    
    //   }
    // });
 if (this.status) {
        this.articlesService.getByStatus(this.status).then(arrFiltrado => {
          console.log(arrFiltrado);
          this.arrFiltrado = arrFiltrado;
          
        });
      }
    });

      // this.activatedRoute.params.subscribe(params => {
      // this.arrFiltrado =  this.articlesService.getByStatus(params['status'])
     // });
    } catch (error) {
      console.log(error)
    }
  }

  // this.activatedRoute.params.subscribe(params => {
  //     this.categoriaSeleccionada = params['categoria'];
      
  //     if (this.categoriaSeleccionada && this.categoriaSeleccionada !== 'filtrar por categoria') {
  //       this.arrPosts = this.postsService.getByCategoria(this.categoriaSeleccionada);
  //       this.tituloCategoria = this.categoriaSeleccionada;
  //     }
  //   });
  // }

  // filtrarContinente($event: any) {
  //   const nuevaRuta = $event.target.value === 'filtrar por categoria' ? '/posts' : `/posts/${$event.target.value}`;
    
  //   this.router.navigate([nuevaRuta]);
    
  //   if ($event.target.value === 'filtrar por categoria') {
  //     this.arrPosts = this.postsService.getAll();
      
  //   } else {
  //     this.arrPosts = this.postsService.getByCategoria($event.target.value);
      
  //   }
  // }


}