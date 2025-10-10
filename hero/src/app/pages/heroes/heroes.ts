import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockSuperHeroService } from '../../services/mock-superhero.service';
import { SuperHero, SuperHeroResponse } from '../../interfaces/superhero.interface';
import { Card } from '../../components/shared/card/card';

@Component({
  selector: 'app-heroes',
  imports: [CommonModule, Card],
  templateUrl: './heroes.html',
  styleUrl: './heroes.css'
})
export class Heroes implements OnInit {
  public heroes = signal<SuperHero[]>([]);
  public searchTerm = signal<string>('');
  public selectedHero = signal<SuperHero | null>(null);

  constructor(public superHeroService: MockSuperHeroService) {}

  ngOnInit() {
    this.loadPopularHeroes();
  }

  loadPopularHeroes() {
    this.superHeroService.loading.set(true);
    const popularIds = ['70', '644', '149', '346', '659']; // Wonder Woman, Superman, Batman, Iron Man, Spider-Man

    popularIds.forEach(id => {
      this.superHeroService.getHeroById(id).subscribe({
        next: (response: SuperHeroResponse) => {
          if (response.response === 'success') {
            this.heroes.update(heroes => [...heroes, response]);
          }
          this.superHeroService.loading.set(false);
        },
        error: (error) => {
          this.superHeroService.handleError(error);
        }
      });
    });
  }

  searchHeroes() {
    const term = this.searchTerm();
    if (term.trim()) {
      this.superHeroService.searchHeroesByName(term).subscribe({
        next: (response) => {
          if (response.response === 'success') {
            this.heroes.set(response.results);
          } else {
            this.heroes.set([]);
          }
          this.superHeroService.loading.set(false);
        },
        error: (error) => {
          this.superHeroService.handleError(error);
        }
      });
    } else {
      this.loadPopularHeroes();
    }
  }

  selectHero(hero: SuperHero) {
    this.selectedHero.set(hero);
  }

  getPowerLevel(hero: SuperHero): number {
    const stats = hero.powerstats;
    const total = parseInt(stats.intelligence) + parseInt(stats.strength) +
                  parseInt(stats.speed) + parseInt(stats.durability) +
                  parseInt(stats.power) + parseInt(stats.combat);
    return Math.round(total / 6);
  }

  getAlignmentColor(alignment: string): string {
    switch (alignment.toLowerCase()) {
      case 'good': return 'text-green-600 dark:text-green-400';
      case 'bad': return 'text-red-600 dark:text-red-400';
      case 'neutral': return 'text-yellow-600 dark:text-yellow-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  }
}
