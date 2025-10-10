import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageProxy',
  standalone: true
})
export class ImageProxyPipe implements PipeTransform {
  transform(imageUrl: string): string {
    if (!imageUrl) {
      return '';
    }
    
    // Usar corsproxy.io para evitar problemas de CORS con imágenes externas
    // Este servicio actúa como proxy y permite cargar imágenes de dominios externos
    return `https://corsproxy.io/?${encodeURIComponent(imageUrl)}`;
  }
}
