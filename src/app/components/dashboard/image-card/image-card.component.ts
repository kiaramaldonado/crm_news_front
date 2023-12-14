import { Component, Input } from '@angular/core';
import { Image } from 'src/app/core/models/image.interface';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.css']
})
export class ImageCardComponent {

   @Input() oneImage!: Image;

}
