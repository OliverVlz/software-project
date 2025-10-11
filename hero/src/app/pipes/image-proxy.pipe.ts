import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'imageProxy',
  standalone: true
})
export class ImageProxyPipe implements PipeTransform {

  private readonly PLACEHOLDER = '/placeholder.png';
  
  transform(imageUrl: string): string {
    if (!imageUrl || imageUrl.trim() === '') {
      return this.PLACEHOLDER;
    }
    
    return `https://corsproxy.io/?${encodeURIComponent(imageUrl)}`;
  }
}
