import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperHero } from '../../../interfaces/superhero.interface';
import { ImageProxyPipe } from '../../../pipes/image-proxy.pipe';
import { parsePowerstat, getPowerstatColor } from '../../../utils/superhero.utils';

@Component({
  selector: 'app-superhero-card',
  imports: [CommonModule, ImageProxyPipe],
  templateUrl: './superhero-card.html',
  styleUrl: './superhero-card.css'
})
export class SuperHeroCard {
  // Input signals (nueva sintaxis Angular)
  superhero = input<SuperHero | null>(null);
  loading = input<boolean>(false);

  // Utilidades compartidas
  protected readonly getPowerStatValue = parsePowerstat;
  protected readonly getPowerStatColor = (value: number) => getPowerstatColor(value);
}
