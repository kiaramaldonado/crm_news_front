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
}

