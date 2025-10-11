import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperHeroService } from '../../services/superhero.service';
import { SuperHero } from '../../interfaces/superhero.interface';
import { ImageProxyPipe } from '../../pipes/image-proxy.pipe';
import { HeroList } from '../../components/shared/hero-list/hero-list';
import { getAlignmentColor } from '../../utils/superhero.utils';

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

  // Constantes de paginación
  private readonly TOTAL_HEROES = 731;
  private readonly ITEMS_PER_PAGE = 8;

  // Utilidades compartidas expuestas al template
  protected readonly getAlignmentColor = getAlignmentColor;

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
    // Páginas 2 en adelante: basadas en el rango total de IDs
    const totalRegularPages = Math.ceil(this.TOTAL_HEROES / this.ITEMS_PER_PAGE);
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
}
