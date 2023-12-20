import { Component, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Image } from 'src/app/core/models/image.interface';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.css']
})
export class ImageCardComponent implements AfterViewInit {

  @Input() oneImage!: Image;
  @ViewChild('copyButton') copyButton!: ElementRef;
  copySuccess = false;


  ngAfterViewInit(): void {
    this.initializeClipboard();
  }

  onClickCopy() {
    const currentImageUrl = this.oneImage.url;

    try {
      navigator.clipboard.writeText(currentImageUrl);
      this.copySuccess = true;

      setTimeout(() => {
        this.copySuccess = false;
      }, 1000);
    } catch (error) {
      console.error('Error al copiar:', error);
    }
  }

  private initializeClipboard() {
    const clipboardButton = this.copyButton.nativeElement;

    clipboardButton.addEventListener('copy', () => {
      console.log(`Texto copiado: ${this.oneImage.url}`);
    });

    clipboardButton.addEventListener('error', (e: any) => {
      console.error(`Error al copiar: ${e.action}`);
    });
  }
}