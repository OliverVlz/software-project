import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperHeroService } from '../../services/superhero.service';
import { SuperHero, SuperHeroResponse, SuperHeroErrorResponse } from '../../interfaces/superhero.interface';
import { ImageProxyPipe } from '../../pipes/image-proxy.pipe';
import { SuperheroMapper } from '../../mappers/superhero.mapper';
import { parsePowerstat, getPowerstatColor } from '../../utils/superhero.utils';
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
        
        // ✅ Usar el mapper para transformar y normalizar los datos
        const hero = SuperheroMapper.mapResponseToSuperhero(successResponse);
        this.superhero.set(hero);
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

  // Utilidades compartidas
  protected readonly getPowerStatValue = parsePowerstat;
  protected readonly getPowerStatColor = (value: number) => getPowerstatColor(value);
}
