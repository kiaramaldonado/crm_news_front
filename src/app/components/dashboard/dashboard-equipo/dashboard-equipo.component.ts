import { Component, Input, inject } from '@angular/core';
import { User } from 'src/app/core/models/user.interface';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-dashboard-equipo',
  templateUrl: './dashboard-equipo.component.html',
  styleUrls: ['./dashboard-equipo.component.css']
})
export class DashboardEquipoComponent {

  usersService = inject(UsersService);

  users: User[] = [];
  userLogged!: User;
  teamMates: User[] = [];

  displayedUsers: User[] = [];

  pageSize: number = 6;
  page: number = 1;
  totalPages: number = 0;
  maxVisiblePages: number = 5;

  async ngOnInit() {
    try {
      this.userLogged = await this.usersService.getById();
      this.users = await this.usersService.getAll();
      this.teamMates = this.users.filter(user => user.id !== this.userLogged.id);

      this.totalPages = Math.ceil(this.teamMates.length / this.pageSize);

      this.actualizarUsuariosPagina();
    } catch (error) {
      console.log(error);
    }
  }

  actualizarUsuariosPagina() {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedUsers = this.teamMates.slice(startIndex, endIndex);
  }

  modificarPagina(siguiente: boolean) {
    if (siguiente && this.page < this.totalPages) {
      this.page++;
    } else if (!siguiente && this.page > 1) {
      this.page--;
    }

    console.log(this.page);

    this.actualizarUsuariosPagina();
  }

  getPageNumbers(): number[] {
    const totalPagesArray = Array.from({ length: this.totalPages }, (_, index) => index + 1);

    // Asegura que siempre se vean 10 páginas
    if (this.totalPages <= this.maxVisiblePages) {
      return totalPagesArray;
    }

    const halfVisible = Math.floor(this.maxVisiblePages / 2);
    let startPage = Math.max(1, this.page - halfVisible);
    let endPage = Math.min(this.totalPages, startPage + this.maxVisiblePages - 1);

    // Ajusta si se acerca a los extremos
    if (endPage - startPage < this.maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - this.maxVisiblePages + 1);
    }

    return totalPagesArray.slice(startPage - 1, endPage);
  }

  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.page = pageNumber;
      this.actualizarUsuariosPagina();
    }
  }

}
