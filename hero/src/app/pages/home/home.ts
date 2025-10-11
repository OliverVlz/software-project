import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperHeroService } from '../../services/superhero.service';
import { SuperHero, SuperHeroResponse, SuperHeroErrorResponse } from '../../interfaces/superhero.interface';
import { ImageProxyPipe } from '../../pipes/image-proxy.pipe';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ImageProxyPipe],
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
          image: {
            url: successResponse.image.url
          }
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
    const randomId = Math.floor(Math.random() * 731) + 1;
    return randomId.toString();
  }

  onRetry(): void {
    this.loadRandomSuperhero();
  }

  getPowerStatValue(stat: string): number {
    return parseInt(stat) || 0;
  }

  getPowerStatColor(value: number): string {
    if (value >= 80) return 'bg-gradient-to-br from-green-400 to-green-600 text-white';
    if (value >= 60) return 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white';
    if (value >= 40) return 'bg-gradient-to-br from-orange-400 to-orange-600 text-white';
    return 'bg-gradient-to-br from-red-400 to-red-600 text-white';
  }
}
