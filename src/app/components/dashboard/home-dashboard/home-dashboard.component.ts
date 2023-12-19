import { Component, Input, inject } from '@angular/core';
import { Article } from 'src/app/core/models/article.interface';
import { User } from 'src/app/core/models/user.interface';
import { ArticlesService } from 'src/app/core/services/articles.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css']
})
export class HomeDashboardComponent {

  articlesService = inject(ArticlesService);
  usersService = inject(UsersService);

  articlesArr: Article[] = [];
  lastAsign: any[] = [];
  @Input() user!: User;

  async ngOnInit() {
    try {
      this.user = await this.usersService.getById();
      console.log(this.user);
      this.articlesArr = await this.articlesService.getByUser();
      this.articlesArr = (await this.filtrarStatus()).reverse()
       console.log(this.articlesArr);
      const newFiltrado = [...new Map(this.articlesArr.map((item: { id: number; }) => [item.id, item])).values()];
      console.log(newFiltrado);
      this.lastAsign = newFiltrado.slice(0,2)
      console.log(this.lastAsign);
    
    } catch (error) {
      console.log(error);
    }
  }

//   async ngOnInit() {
//   try {
//     this.user = await this.usersService.getById();
//     console.log(this.user);
//     this.articlesArr = await this.articlesService.getByUser();

//     // Verificar si hay elementos en this.articlesArr
//     if (this.articlesArr.length > 0) {
//       this.articlesArr = (await this.filtrarStatus()).reverse();
//       console.log(this.articlesArr);
//       const newFiltrado = [...new Map(this.articlesArr.map((item: { id: number; }) => [item.id, item])).values()];
//       console.log(newFiltrado);
//       this.lastAsign = newFiltrado.slice(0, 2); // Obtener los dos primeros elementos
//       console.log(this.lastAsign);
//     } else {
//       console.log("El usuario no tiene asignaciones.");
//       // Puedes manejar este caso según tus necesidades, por ejemplo, mostrar un mensaje al usuario.
//     }

//   } catch (error) {
//     console.log(error);
//   }
// }

  async filtrarStatus() {
    if (this.user && this.user.role === 'editor') {
      return this.articlesArr.filter(article => article.status === "revision");
    } else {
      return this.articlesArr.filter(article => article.status === "borrador");
    }
  }

}
