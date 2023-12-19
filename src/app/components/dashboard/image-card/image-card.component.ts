import { Component, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Image } from 'src/app/core/models/image.interface';
import * as ClipboardJS from 'clipboard';

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
      // Intenta copiar la URL al portapapeles
      navigator.clipboard.writeText(currentImageUrl);
      this.copySuccess = true;

      setTimeout(() => {
        this.copySuccess = false;
      }, 2000);
    } catch (error) {
      console.error('Error al copiar:', error);
    }
  }

  private initializeClipboard() {
    // No es necesario utilizar la biblioteca ClipboardJS para escribir en el portapapeles nativo
    // Puedes usar la API de Clipboard directamente
    const clipboardButton = this.copyButton.nativeElement;

    // Evento cuando se copia exitosamente
    clipboardButton.addEventListener('copy', () => {
      console.log(`Texto copiado: ${this.oneImage.url}`);
    });

    // Evento en caso de error al copiar
    clipboardButton.addEventListener('error', (e:any) => {
      console.error(`Error al copiar: ${e.action}`);
    });
  }
}