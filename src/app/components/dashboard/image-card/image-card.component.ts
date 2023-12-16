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

  ngAfterViewInit(): void {
    // Creamos una nueva instancia de ClipboardJS después de la inicialización de la vista
    this.initializeClipboard();
  }

  onClickCopy() {
    // Seteamos la URL actual para copiar
    const currentImageUrl = this.oneImage.url;

    // Creamos una nueva instancia de ClipboardJS y la destruimos después de copiar
    const clipboard = new ClipboardJS(this.copyButton.nativeElement, {
      text: () => currentImageUrl
    });

    // Evento cuando se copia exitosamente
    clipboard.on('success', (e) => {
      console.log(`Texto copiado: ${currentImageUrl}`);
      e.clearSelection();

      // Destruimos la instancia de ClipboardJS después de copiar
      clipboard.destroy();
    });

    // Evento en caso de error al copiar
    clipboard.on('error', (e) => {
      console.error(`Error al copiar: ${e.action}`);
    });
  }

  private initializeClipboard() {
    // Creamos una nueva instancia de ClipboardJS después de la inicialización de la vista
    const clipboard = new ClipboardJS(this.copyButton.nativeElement, {
      text: () => this.oneImage.url
    });

    // Evento cuando se copia exitosamente
    clipboard.on('success', (e) => {
      console.log(`Texto copiado: ${this.oneImage.url}`);
      e.clearSelection();

      // Destruimos la instancia de ClipboardJS después de copiar
      clipboard.destroy();
    });

    // Evento en caso de error al copiar
    clipboard.on('error', (e) => {
      console.error(`Error al copiar: ${e.action}`);
    });
  }
}