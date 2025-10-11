import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperHero } from '../../../interfaces/superhero.interface';
import { ImageProxyPipe } from '../../../pipes/image-proxy.pipe';
import { getAlignmentColor, getAlignmentLabel, calculateAveragePowerLevel, parsePowerstat } from '../../../utils/superhero.utils';

@Component({
  selector: 'app-hero-list',
  imports: [CommonModule, ImageProxyPipe],
  templateUrl: './hero-list.html',
})
export class HeroList {

  heroes = input<SuperHero[]>([]);
  loading = input<boolean>(false);
  heroSelected = output<SuperHero>();

  protected readonly getAlignmentColor = getAlignmentColor;
  protected readonly getAlignmentLabel = getAlignmentLabel;
  protected readonly getPowerLevel = calculateAveragePowerLevel;
  protected readonly getPowerStatValue = parsePowerstat;

  onHeroClick(hero: SuperHero) {
    this.heroSelected.emit(hero);
  }
}
