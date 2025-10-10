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
    
    // Usar images.weserv.nl como proxy de imágenes para evitar CORS
    // Este servicio es confiable y gratuito
    const cleanUrl = imageUrl.replace('https://', '').replace('http://', '');
    return `https://images.weserv.nl/?url=${cleanUrl}`;
  }
}
