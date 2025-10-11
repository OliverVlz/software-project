import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperHeroService } from '../../services/superhero.service';
import { CombatService } from '../../services/combat.service';
import { SuperHero, SuperHeroResponse, SuperHeroErrorResponse } from '../../interfaces/superhero.interface';
import { CombatResult } from '../../interfaces/combat.interface';
import { ImageProxyPipe } from '../../pipes/image-proxy.pipe';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-combat',
  imports: [CommonModule, ImageProxyPipe],
  templateUrl: './combat.html',
  styleUrl: './combat.css'
})
export class Combat implements OnInit {
  // Signals para manejar el estado
  public hero1 = signal<SuperHero | null>(null);
  public hero2 = signal<SuperHero | null>(null);
  public loading = signal<boolean>(false);
  public error = signal<string | null>(null);
  public combatResult = signal<CombatResult | null>(null);
  public showResult = signal<boolean>(false);
  public isFighting = signal<boolean>(false);

  constructor(
    private superheroService: SuperHeroService,
    private combatService: CombatService
  ) {}

  ngOnInit(): void {
    this.startNewCombat();
  }

  async startNewCombat(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    this.combatResult.set(null);
    this.showResult.set(false);
    this.isFighting.set(false);

    try {
      // Obtener dos héroes aleatorios diferentes usando el servicio
      const [id1, id2] = this.combatService.getRandomCombatIds();

      console.log('Loading heroes for combat:', id1, id2);

      // Cargar ambos héroes en paralelo
      const [response1, response2] = await Promise.all([
        firstValueFrom(this.superheroService.getHeroById(id1)),
        firstValueFrom(this.superheroService.getHeroById(id2))
      ]);

      // Validar respuestas
      if (response1.response === 'success' && response2.response === 'success') {
        this.hero1.set(this.mapResponseToHero(response1));
        this.hero2.set(this.mapResponseToHero(response2));
      } else {
        this.error.set('Error al cargar los superhéroes para el combate');
      }
    } catch (error: any) {
      console.error('Error loading heroes for combat:', error);
      this.error.set(error.error?.error || error.message || 'Error al cargar los superhéroes');
    } finally {
      this.loading.set(false);
    }
  }

  private mapResponseToHero(response: SuperHeroResponse): SuperHero {
    return {
      id: response.id,
      name: response.name,
      powerstats: response.powerstats,
      biography: response.biography,
      appearance: response.appearance,
      work: response.work,
      connections: response.connections,
      image: {
        url: response.image.url
      }
    };
  }


  async fight(): Promise<void> {
    if (!this.hero1() || !this.hero2()) return;

    this.isFighting.set(true);

    // Simular una pelea con animación usando el servicio
    await this.combatService.delay(2000);

    // Determinar el ganador usando el servicio de combate
    const result = this.combatService.determineWinner(this.hero1()!, this.hero2()!);

    this.combatResult.set(result);
    this.isFighting.set(false);
    this.showResult.set(true);
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

  onRetry(): void {
    this.startNewCombat();
  }
}

