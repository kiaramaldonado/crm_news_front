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

  ImagesArr: Image[] = [];

  async ngOnInit() {
    try {
      this.ImagesArr = await this.ImagesService.getAllImages()
    } catch (error) {
      console.log(error)
    }
  }

}
