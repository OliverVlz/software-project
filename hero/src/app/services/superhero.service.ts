import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of, forkJoin } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import {
  SuperHero,
  SuperHeroResponse,
  SearchResponse
} from '../interfaces/superhero.interface';
import { SuperheroMapper } from '../mappers/superhero.mapper';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class SuperHeroService {
  private readonly baseUrl = environment.production
    ? environment.urlBase + environment.apiKey
    : `/api/${environment.apiKey}`;

  // Signals para manejar el estado
  public loading = signal<boolean>(false);
  public error = signal<string | null>(null);

  constructor(
    private http: HttpClient,
    private cacheService: CacheService
  ) {}

  // Obtener héroe por ID
  getHeroById(id: string): Observable<SuperHeroResponse> {
    this.error.set(null);

    const cacheKey = `hero_${id}`;
    const cachedData = this.cacheService.get<SuperHeroResponse>(cacheKey);

    if (cachedData) {
      console.log(`Cache hit para héroe ID: ${id}`);
      return of(cachedData);
    }

    console.log(`Cache miss para héroe ID: ${id}`);
    return this.http.get<SuperHeroResponse>(`${this.baseUrl}/${id}`).pipe(
      tap(response => {
        this.cacheService.set(cacheKey, response, 10 * 60 * 1000); // 10 minutos para héroes individuales
      }),
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return of({} as SuperHeroResponse);
      })
    );
  }

  // Buscar héroes por nombre
  searchHeroesByName(name: string): Observable<SearchResponse> {
    this.loading.set(true);
    this.error.set(null);

    const cacheKey = `search_${name.toLowerCase()}`;
    const cachedData = this.cacheService.get<SearchResponse>(cacheKey);

    if (cachedData) {
      console.log(`Cache hit para búsqueda: ${name}`);
      this.loading.set(false);
      return of(cachedData);
    }

    console.log(`Cache miss para búsqueda: ${name}`);
    return this.http.get<SearchResponse>(`${this.baseUrl}/search/${name}`).pipe(
      tap(response => {
        this.cacheService.set(cacheKey, response, 5 * 60 * 1000); // 5 minutos para búsquedas
        this.loading.set(false);
      }),
      catchError(error => {
        this.handleError(error);
        return of({} as SearchResponse);
      })
    );
  }

  private readonly allHeroIds: string[] = Array.from({ length: 731 }, (_, i) => (i + 1).toString());
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
  private readonly itemsPerPage = 8;

  getHeroesByPage(page: number): Observable<SuperHero[]> {
    this.loading.set(true);
    this.error.set(null);

    let heroIdsToLoad: string[] = [];

    if (page === 1) {
      heroIdsToLoad = this.famousHeroIds;
    } else {
      const startIndex = (page - 2) * this.itemsPerPage;
      heroIdsToLoad = this.allHeroIds.slice(startIndex, startIndex + this.itemsPerPage);
    }

    const heroRequests: Observable<SuperHeroResponse>[] = heroIdsToLoad.map(id =>
      this.getHeroById(id).pipe(
        catchError((error) => {
          console.warn(`Error al cargar el héroe ID ${id}:`, error);
          return of({ response: 'error', error: 'No se pudo cargar el héroe' } as unknown as SuperHeroResponse);
        })
      )
    );

    return forkJoin(heroRequests).pipe(
      map(responses => SuperheroMapper.mapResponseArrayToSuperheroes(responses)),
      tap(() => this.loading.set(false)),
      catchError(error => {
        this.handleError(error);
        return of([]);
      })
    );
  }

  // Método para manejar errores
  handleError(error: HttpErrorResponse | Error): void {
    this.loading.set(false);
    const errorMessage = error instanceof HttpErrorResponse
      ? `Error ${error.status}: ${error.message}`
      : error.message || 'Error al cargar los datos';

    this.error.set(errorMessage);
    console.error('Error en SuperHero Service:', error);
  }

  // Método para limpiar errores
  clearError(): void {
    this.error.set(null);
  }

  // Métodos para gestión del cache
  clearCache(): void {
    this.cacheService.clear();
    console.log('Cache limpiado');
  }

  getCacheStats() {
    return this.cacheService.getStats();
  }
}
