import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperHeroService } from '../../services/superhero.service';
import { SuperHero, SuperHeroResponse } from '../../interfaces/superhero.interface';
import { ImageProxyPipe } from '../../pipes/image-proxy.pipe';
import { HeroList } from '../../components/shared/hero-list/hero-list';

@Component({
  selector: 'app-heroes',
  imports: [CommonModule, HeroList, ImageProxyPipe],
  templateUrl: './heroes.html',
  styleUrl: './heroes.css'
})
export class Heroes implements OnInit {
  public heroes = signal<SuperHero[]>([]);
  public searchTerm = signal<string>('');
  public selectedHero = signal<SuperHero | null>(null);
  public currentPage = signal<number>(1);

  // IDs de superhéroes famosos para la primera página
  private readonly famousHeroIds = [
    '70',   // Batman
    '644',  // Superman
    '149',  // Iron Man
    '346',  // Wonder Woman
    '659',  // Spider-Man
    '213',  // Captain America
    '620',  // Deadpool
    '332',  // Hulk
  ];

  // Rango total de IDs en la API (1-731)
  private readonly minId = 1;
  private readonly maxId = 731;
  private readonly itemsPerPage = 8;

  constructor(public superHeroService: SuperHeroService) {}

  ngOnInit() {
    this.loadHeroesPage(1);
  }

  loadHeroesPage(page: number) {
    this.superHeroService.loading.set(true);
    this.currentPage.set(page);

    this.superHeroService.getHeroesByPage(page).subscribe({
      next: (heroes) => {
        this.heroes.set(heroes);
        this.superHeroService.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading heroes by page:', error);
        this.superHeroService.handleError(error);
        this.superHeroService.loading.set(false);
      }
    });
  }

  onPageChange(page: number) {
    this.loadHeroesPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getTotalPages(): number {
    // Página 1: héroes famosos (no basada en IDs secuenciales)
    // Páginas 2 en adelante: basadas en el rango total de IDs (731)
    const totalRegularPages = Math.ceil(731 / this.itemsPerPage);
    return totalRegularPages + 1; // +1 por la primera página de héroes famosos
  }

  hasNextPage(): boolean {
    return this.currentPage() < this.getTotalPages();
  }

  hasPreviousPage(): boolean {
    return this.currentPage() > 1;
  }

  searchHeroes() {
    const term = this.searchTerm();
    if (term.trim()) {
      this.superHeroService.loading.set(true);
      this.superHeroService.searchHeroesByName(term).subscribe({
        next: (response) => {
          if (response.response === 'success') {
            this.heroes.set(response.results);
            this.currentPage.set(0); // Indicar que estamos en modo búsqueda
          } else {
            this.heroes.set([]);
          }
          this.superHeroService.loading.set(false);
        },
        error: (error) => {
          this.superHeroService.handleError(error);
          this.superHeroService.loading.set(false);
        }
      });
    } else {
      this.heroes.set([]);
      this.loadHeroesPage(1);
    }
  }

  selectHero(hero: SuperHero) {
    this.selectedHero.set(hero);
  }

  getAlignmentColor(alignment: string): string {
    switch (alignment?.toLowerCase()) {
      case 'good': return 'bg-green-500/90 text-white';
      case 'bad': return 'bg-red-500/90 text-white';
      case 'neutral': return 'bg-yellow-500/90 text-white';
      default: return 'bg-gray-500/90 text-white';
    }
  }
}
