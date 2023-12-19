import { Component, inject } from '@angular/core';
import { Image } from 'src/app/core/models/image.interface';
import { ImagesService } from 'src/app/core/services/images.service';

@Component({
  selector: 'app-dashboard-images',
  templateUrl: './dashboard-images.component.html',
  styleUrls: ['./dashboard-images.component.css']
})
export class DashboardImagesComponent {

  ImagesService = inject(ImagesService);

  allImages: any[] = [];
  ImagesArr: any[] = [];
  pageSize: number = 4;
  page: number = 1;
  totalPages: number = 0;
  maxVisiblePages: number = 10;

  async ngOnInit() {
    await this.cargarImagenes();
  }

  async cargarImagenes() {
    try {
      const response = await this.ImagesService.getAllImages();
      console.log(response);
      this.allImages = response;
      this.totalPages = Math.ceil(this.allImages.length / this.pageSize);
      this.actualizarImagenesPagina();
    } catch (error) {
      console.log(error);
    }
  }

  actualizarImagenesPagina() {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.ImagesArr = this.allImages.slice(startIndex, endIndex);
  }

  modificarPagina(siguiente: boolean) {
    if (siguiente && this.page < this.totalPages) {
      this.page++;
    } else if (!siguiente && this.page > 1) {
      this.page--;
    }

    console.log(this.page);

    this.actualizarImagenesPagina();
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
      this.actualizarImagenesPagina();
    }
  }
}

