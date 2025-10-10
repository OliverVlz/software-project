import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperHero } from '../../../interfaces/superhero.interface';
import { ImageProxyPipe } from '../../../pipes/image-proxy.pipe';

@Component({
  selector: 'app-superhero-card',
  imports: [CommonModule, ImageProxyPipe],
  templateUrl: './superhero-card.html',
  styleUrl: './superhero-card.css'
})
export class SuperHeroCard {
  @Input() superhero: SuperHero | null = null;
  @Input() loading: boolean = false;

  getPowerStatValue(stat: string): number {
    return parseInt(stat) || 0;
  }

  getPowerStatColor(value: number): string {
    if (value >= 80) return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900';
    if (value >= 60) return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900';
    if (value >= 40) return 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900';
    return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900';
  }
}
