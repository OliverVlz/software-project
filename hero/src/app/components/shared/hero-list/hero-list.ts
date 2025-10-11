import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperHero } from '../../../interfaces/superhero.interface';
import { ImageProxyPipe } from '../../../pipes/image-proxy.pipe';

@Component({
  selector: 'app-hero-list',
  imports: [CommonModule, ImageProxyPipe],
  templateUrl: './hero-list.html',
  styleUrl: './hero-list.css'
})
export class HeroList {
  @Input() heroes: SuperHero[] = [];
  @Input() loading: boolean = false;
  @Output() heroSelected = new EventEmitter<SuperHero>();

  onHeroClick(hero: SuperHero) {
    this.heroSelected.emit(hero);
  }

  getPowerLevel(hero: SuperHero): number {
    const stats = hero.powerstats;
    const total = parseInt(stats.intelligence || '0') + parseInt(stats.strength || '0') +
                  parseInt(stats.speed || '0') + parseInt(stats.durability || '0') +
                  parseInt(stats.power || '0') + parseInt(stats.combat || '0');
    return Math.round(total / 6);
  }

  getAlignmentColor(alignment: string): string {
    switch (alignment?.toLowerCase()) {
      case 'good': 
        return 'bg-green-500/90 text-white';
      case 'bad': 
        return 'bg-red-500/90 text-white';
      case 'neutral': 
        return 'bg-yellow-500/90 text-white';
      default: 
        return 'bg-gray-500/90 text-white';
    }
  }

  getAlignmentLabel(alignment: string): string {
    switch (alignment?.toLowerCase()) {
      case 'good': return 'Héroe';
      case 'bad': return 'Villano';
      case 'neutral': return 'Neutral';
      default: return 'Desconocido';
    }
  }
}
