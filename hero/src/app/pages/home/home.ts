import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperHeroService } from '../../services/superhero.service';
import { SuperHero, SuperHeroResponse, SuperHeroErrorResponse } from '../../interfaces/superhero.interface';
import { SuperHeroCard } from '../../components/shared/superhero-card/superhero-card';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [CommonModule, SuperHeroCard],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  // Signals para manejar el estado
  public superhero = signal<SuperHero | null>(null);
  public loading = signal<boolean>(false);
  public error = signal<string | null>(null);

  constructor(private superheroService: SuperHeroService) {}

  ngOnInit(): void {
    this.loadRandomSuperhero();
  }

  async loadRandomSuperhero(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const randomId = this.getRandomSuperheroId();
      console.log('Loading superhero with ID:', randomId);
      
      const response: SuperHeroResponse | SuperHeroErrorResponse = await firstValueFrom(this.superheroService.getHeroById(randomId));
      console.log('API Response:', response);
      
      if (response && response.response === 'success') {
        const successResponse = response as SuperHeroResponse;
        
        this.superhero.set({
          id: successResponse.id,
          name: successResponse.name,
          powerstats: successResponse.powerstats,
          biography: successResponse.biography,
          appearance: successResponse.appearance,
          work: successResponse.work,
          connections: successResponse.connections,
          image: successResponse.image
        });
      } else if (response && response.response === 'error') {
        const errorResponse = response as unknown as SuperHeroErrorResponse;
        this.error.set(errorResponse.error || 'El superhéroe no existe');
      } else {
        this.error.set('No se pudo cargar el superhéroe');
      }
    } catch (error: any) {
      console.error('Error loading superhero:', error);
      if (error.status === 404) {
        this.error.set('Superhéroe no encontrado');
      } else if (error.status === 0) {
        this.error.set('Error de conexión. Verifica tu conexión a internet');
      } else {
        this.error.set(error.error?.error || error.message || 'Error al cargar el superhéroe');
      }
    } finally {
      this.loading.set(false);
    }
  }

  private getRandomSuperheroId(): string {
    // IDs de superhéroes populares que sabemos que existen
    const popularIds = [
      '70',   // Batman
      '644',  // Superman  
      '149',  // Iron Man
      '346',  // Wonder Woman
      '659',  // Spider-Man
      '213',  // Captain America
      '30',   // Aquaman
      '107',  // Black Widow
      '135'   // Hulk
    ];
    const randomIndex = Math.floor(Math.random() * popularIds.length);
    return popularIds[randomIndex];
  }

  onRetry(): void {
    this.loadRandomSuperhero();
  }
}
