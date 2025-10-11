import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageProxy',
  standalone: true
})
export class ImageProxyPipe implements PipeTransform {
  private readonly PLACEHOLDER = 'https://via.placeholder.com/400x600/3B82F6/FFFFFF?text=No+Image';
  
  transform(imageUrl: string): string {
    // Si la URL está vacía, null o undefined, usar placeholder
    if (!imageUrl || imageUrl.trim() === '') {
      return this.PLACEHOLDER;
    }
    
    // Usar corsproxy.io para evitar problemas de CORS con imágenes externas
    // Este servicio actúa como proxy y permite cargar imágenes de dominios externos
    return `https://corsproxy.io/?${encodeURIComponent(imageUrl)}`;
  }
}
