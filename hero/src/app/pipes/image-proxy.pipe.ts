import { Pipe, PipeTransform } from '@angular/core';

import { environment } from '../../environments/environment';

@Pipe({
  name: 'imageProxy',
  standalone: true
})
export class ImageProxyPipe implements PipeTransform {
  transform(imageUrl: string): string {
    if (!imageUrl || imageUrl.trim() === '') {
      return imageUrl;
    }
    
    return `https://corsproxy.io/?${encodeURIComponent(imageUrl)}`;
  }
}
