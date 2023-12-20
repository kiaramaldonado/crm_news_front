import { Component, inject } from '@angular/core';
import { ImagesService } from 'src/app/core/services/images.service';

@Component({
  selector: 'app-dashboard-images',
  templateUrl: './dashboard-images.component.html',
  styleUrls: ['./dashboard-images.component.css']
})
export class DashboardImagesComponent {

  allImages: any[] = [];
  imagesArr: any[] = [];
  pageSize: number = 4;
  page: number = 1;
  totalPages: number = 0;
  maxVisiblePages: number = 10;

  imagesService = inject(ImagesService);

  async ngOnInit() {
    await this.loadImages();
  }

  async loadImages() {
    try {
      const response = await this.imagesService.getAllImages();
      this.allImages = response;
      this.totalPages = Math.ceil(this.allImages.length / this.pageSize);
      this.updateImagesPage();
    } catch (error) {
      console.log(error);
    }
  }

  updateImagesPage() {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.imagesArr = this.allImages.slice(startIndex, endIndex);
  }

  changePage(siguiente: boolean) {
    if (siguiente && this.page < this.totalPages) {
      this.page++;
    } else if (!siguiente && this.page > 1) {
      this.page--;
    }

    this.updateImagesPage();
  }

  getPageNumbers(): number[] {
    const totalPagesArray = Array.from({ length: this.totalPages }, (_, index) => index + 1);

    if (this.totalPages <= this.maxVisiblePages) {
      return totalPagesArray;
    }

    const halfVisible = Math.floor(this.maxVisiblePages / 2);
    let startPage = Math.max(1, this.page - halfVisible);
    let endPage = Math.min(this.totalPages, startPage + this.maxVisiblePages - 1);

    if (endPage - startPage < this.maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - this.maxVisiblePages + 1);
    }

    return totalPagesArray.slice(startPage - 1, endPage);
  }

  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.page = pageNumber;
      this.updateImagesPage();
    }
  }
}

