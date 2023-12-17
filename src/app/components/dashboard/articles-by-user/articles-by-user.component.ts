import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/core/models/article.interface';
import { User } from 'src/app/core/models/user.interface';
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
  @Input() user!: User;
  arrFiltrado: any;
  status: string = '';
  newFiltrado: any[] = []


  async ngOnInit() {
    try {
      this.user = await this.usersService.getById();
      this.articlesArr = await this.articlesService.getByUser();
      this.articlesArr = await this.filtrarStatus();
      this.arrFiltrado = this.articlesArr.reverse();
      this.newFiltrado = [...new Map(this.arrFiltrado.map((item: { id: number; }) => [item.id, item])).values()];
      
      console.log(this.newFiltrado);
      
    } catch (error) {
      console.log(error);
    }
  }



  async filtrarStatus() {
    if (this.user && this.user.role === 'editor') {
      return this.articlesArr.filter(article => article.status === "revision");
    } else {
      return this.articlesArr.filter(article => article.status === "borrador");
    }
  }
}


  // Me filtra por estado, pero no por user. La Ruta no se mantiene, por lo que no puedo "navegar"
//      async ngOnInit() {
      
//       this.activatedRoute.params.subscribe(params => { this.status = params['status'];
//       console.log(this.status);
      
//  if (this.status) {
//         this.articlesService.getByStatus(this.status).then(arrFiltrado => {
//           this.arrFiltrado = arrFiltrado;
//           console.log(arrFiltrado);
//         });
//       }
//     });
// }

// Supongamos que tienes un array llamado 'articles'
const articles = [
    { id: 1, user_id: 1, articles_id: 101, assignment_date: '2023-01-01', finish_date: '2023-01-10', comments: '...1', actual_status: 'revision' },
    { id: 2, user_id: 1, articles_id: 102, assignment_date: '2023-01-05', finish_date: '2023-01-15', comments: '...2', actual_status: 'borrador' },
    { id: 1, user_id: 1, articles_id: 101, assignment_date: '2023-01-03', finish_date: '2023-01-12', comments: '...3', actual_status: 'publicado' },
    // Más objetos...
];

// Creamos un mapa para almacenar el elemento más reciente de cada ID
const uniqueArticlesMap = new Map();

articles.forEach(article => {
    // Si el mapa aún no contiene una entrada para este ID o si el elemento actual es más reciente, lo almacenamos en el mapa
    if (!uniqueArticlesMap.has(article.id) || article.assignment_date > uniqueArticlesMap.get(article.id).assignment_date) {
        uniqueArticlesMap.set(article.id, article);
    }
});

// Obtenemos un array con los elementos únicos (el más reciente por cada ID)
const uniqueArticles = Array.from(uniqueArticlesMap.values());

console.log(uniqueArticles);


      

