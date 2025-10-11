import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of, throwError, concat, timer } from 'rxjs';
import { tap, catchError, map, switchMap, filter, toArray } from 'rxjs/operators';
import { SuperHero, SuperHeroResponse, SearchResponse } from '../interfaces/superhero.interface';

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

  constructor(private http: HttpClient) {}

  // Obtener héroe por ID
  getHeroById(id: string): Observable<SuperHeroResponse> {
    this.loading.set(true);
    this.error.set(null);

    return this.http.get(`${this.baseUrl}/${id}`, { responseType: 'text' }).pipe(
      map(response => {
        try {
          return JSON.parse(response) as SuperHeroResponse;
        } catch (e) {
          console.error('Error parsing JSON from API');
          throw new Error('Invalid JSON response from API');
        }
      }),
      tap(() => this.loading.set(false)),
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

    return this.http.get<SearchResponse>(`${this.baseUrl}/search/${name}`).pipe(
      tap(() => this.loading.set(false)),
      catchError(error => {
        this.handleError(error);
        return of({} as SearchResponse);
      })
    );
  }

  // Obtener powerstats de un héroe
  getHeroPowerstats(id: string): Observable<{ response: string; id: string; name: string; powerstats: any }> {
    return this.http.get<{ response: string; id: string; name: string; powerstats: any }>(`${this.baseUrl}/${id}/powerstats`);
  }

  // Obtener biografía de un héroe
  getHeroBiography(id: string): Observable<{ response: string; id: string; name: string; biography: any }> {
    return this.http.get<{ response: string; id: string; name: string; biography: any }>(`${this.baseUrl}/${id}/biography`);
  }

  // Obtener apariencia de un héroe
  getHeroAppearance(id: string): Observable<{ response: string; id: string; name: string; appearance: any }> {
    return this.http.get<{ response: string; id: string; name: string; appearance: any }>(`${this.baseUrl}/${id}/appearance`);
  }

  // Obtener trabajo de un héroe
  getHeroWork(id: string): Observable<{ response: string; id: string; name: string; work: any }> {
    return this.http.get<{ response: string; id: string; name: string; work: any }>(`${this.baseUrl}/${id}/work`);
  }

  // Obtener conexiones de un héroe
  getHeroConnections(id: string): Observable<{ response: string; id: string; name: string; connections: any }> {
    return this.http.get<{ response: string; id: string; name: string; connections: any }>(`${this.baseUrl}/${id}/connections`);
  }

  // Obtener imagen de un héroe
  getHeroImage(id: string): Observable<{ response: string; id: string; name: string; image: { url: string } }> {
    return this.http.get<{ response: string; id: string; name: string; image: { url: string } }>(`${this.baseUrl}/${id}/image`);
  }

  // Método para obtener héroes populares (IDs conocidos)
  getPopularHeroes(): Observable<SuperHeroResponse>[] {
    const popularIds = ['70', '644', '149', '346', '659']; // Wonder Woman, Superman, Batman, Iron Man, Spider-Man
    return popularIds.map(id => this.getHeroById(id));
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

    return concat(...heroRequests.map((req, index) =>
      timer(index * 100).pipe(
        switchMap(() => req)
      )
    )).pipe(
      filter(response => response.response === 'success'),
      map(response => response as SuperHero),
      toArray(),
      tap(() => this.loading.set(false)),
      catchError(error => {
        this.handleError(error);
        return of([]);
      })
    );
  }

  // Método para manejar errores
  handleError(error: any): void {
    this.loading.set(false);
    this.error.set(error.message || 'Error al cargar los datos');
    console.error('Error en SuperHero Service:', error);
  }

  // Método para limpiar errores
  clearError(): void {
    this.error.set(null);
  }
}
