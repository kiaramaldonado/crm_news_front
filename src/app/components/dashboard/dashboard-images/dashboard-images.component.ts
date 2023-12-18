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

  ImagesArr: any[] = [];
   page: number = 1;
  totalPages:number = 0;
  pageSize: number = 10;

  async ngOnInit() {
    this.cargarImagenes();
  }

  modificarPagina(siguiente: boolean){
    if(siguiente) this.page++;
    else this.page--;
    console.log(this.page);
    
    this.cargarImagenes();
  }

  async cargarImagenes() {
    try {
      const response = await this.ImagesService.getAllImages(this.page);
      console.log(response);
      this.ImagesArr = response;
      
      // this.totalPages = response.info.pages;
      // this.ImagesArr = response.results;
    } catch (error) {
      console.log(error);
    }
  }



}
