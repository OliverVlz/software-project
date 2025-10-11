import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageProxy',
  standalone: true
})
export class ImageProxyPipe implements PipeTransform {
  private readonly PLACEHOLDER = 'https://via.placeholder.com/400x600/3B82F6/FFFFFF?text=No+Image';
  
  transform(imageUrl: string): string {
    if (!imageUrl || imageUrl.trim() === '') {
      return this.PLACEHOLDER;
    }
    
    return `https://corsproxy.io/?${encodeURIComponent(imageUrl)}`;
  }
}
