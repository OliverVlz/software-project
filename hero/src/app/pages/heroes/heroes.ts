import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockSuperHeroService } from '../../services/mock-superhero.service';
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
  public isLoadingPage = signal<boolean>(false);

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

  constructor(public superHeroService: MockSuperHeroService) {}

  ngOnInit() {
    this.loadHeroesPage(1);
  }

  loadHeroesPage(page: number) {
    this.isLoadingPage.set(true);
    this.superHeroService.loading.set(true);
    this.currentPage.set(page);
    
    if (page === 1) {
      // Primera página: héroes famosos (estos sabemos que existen)
      this.loadHeroesByIds(this.famousHeroIds, page);
    } else {
      // Páginas siguientes: cargar con validación
      const startId = (page - 2) * this.itemsPerPage + 1;
      this.loadHeroesWithFallback(startId, this.itemsPerPage, page);
    }
  }

  // Cargar héroes por IDs específicos (para página 1)
  private loadHeroesByIds(ids: string[], page: number) {
    const loadedHeroes: SuperHero[] = [];
    let loadedCount = 0;
    const totalToLoad = ids.length;

    console.log(`Loading page ${page} with IDs:`, ids);

    ids.forEach(id => {
      this.superHeroService.getHeroById(id).subscribe({
        next: (response: SuperHeroResponse) => {
          if (response.response === 'success') {
            loadedHeroes.push(response);
          }
          loadedCount++;
          if (loadedCount === totalToLoad) {
            console.log(`Page ${page} loaded. Total heroes:`, loadedHeroes.length);
            this.heroes.set(loadedHeroes);
            this.superHeroService.loading.set(false);
            this.isLoadingPage.set(false);
          }
        },
        error: (error) => {
          console.error(`Error loading hero ${id}:`, error);
          loadedCount++;
          if (loadedCount === totalToLoad) {
            this.heroes.set(loadedHeroes);
            this.superHeroService.loading.set(false);
            this.isLoadingPage.set(false);
          }
        }
      });
    });
  }

  // Cargar héroes con fallback: si uno falla, intenta el siguiente
  private loadHeroesWithFallback(startId: number, count: number, page: number) {
    const loadedHeroes: SuperHero[] = [];
    let currentId = startId;
    let attempts = 0;
    const maxAttempts = count * 3; // Intentar hasta 3 veces el número necesario

    console.log(`Loading page ${page} starting from ID ${startId}, need ${count} heroes`);

    const tryLoadNextHero = () => {
      // Si ya tenemos suficientes héroes o excedimos intentos máximos
      if (loadedHeroes.length >= count || attempts >= maxAttempts || currentId > this.maxId) {
        console.log(`Page ${page} loaded. Total heroes: ${loadedHeroes.length}, Attempts: ${attempts}`);
        this.heroes.set(loadedHeroes);
        this.superHeroService.loading.set(false);
        this.isLoadingPage.set(false);
        return;
      }

      attempts++;
      const idToTry = currentId.toString();
      
      this.superHeroService.getHeroById(idToTry).subscribe({
        next: (response: SuperHeroResponse) => {
          if (response.response === 'success') {
            loadedHeroes.push(response);
            console.log(`✓ Hero ${idToTry} loaded: ${response.name} (${loadedHeroes.length}/${count})`);
          } else {
            console.warn(`✗ Hero ${idToTry} not found, trying next...`);
          }
          currentId++;
          tryLoadNextHero();
        },
        error: (error) => {
          console.warn(`✗ Hero ${idToTry} failed, trying next...`, error);
          currentId++;
          tryLoadNextHero();
        }
      });
    };

    tryLoadNextHero();
  }

  onPageChange(page: number) {
    this.loadHeroesPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getTotalPages(): number {
    // Calcular páginas disponibles basado en el rango de IDs
    // Página 1 = famosos (8)
    // Resto de páginas = chunks del 1-731
    return Math.ceil(this.maxId / this.itemsPerPage) + 1; // +1 por la página de famosos
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
