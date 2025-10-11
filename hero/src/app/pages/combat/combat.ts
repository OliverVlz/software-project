import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperHeroService } from '../../services/superhero.service';
import { CombatService } from '../../services/combat.service';
import { SuperHero, SuperHeroResponse } from '../../interfaces/superhero.interface';
import { CombatResult } from '../../interfaces/combat.interface';
import { ImageProxyPipe } from '../../pipes/image-proxy.pipe';
import { SuperheroMapper } from '../../mappers/superhero.mapper';
import { parsePowerstat, getPowerstatColor } from '../../utils/superhero.utils';
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

      // Validar respuestas y usar mapper
      if (response1.response === 'success' && response2.response === 'success') {
        const hero1 = SuperheroMapper.mapResponseToSuperhero(response1);
        const hero2 = SuperheroMapper.mapResponseToSuperhero(response2);

        // ✅ Diagnóstico: verificar datos después del mapper
        console.log('🔍 Datos después del mapper - Héroe 1:', {
          name: hero1.name,
          powerstats: hero1.powerstats,
          biography: hero1.biography
        });
        console.log('🔍 Datos después del mapper - Héroe 2:', {
          name: hero2.name,
          powerstats: hero2.powerstats,
          biography: hero2.biography
        });

        this.hero1.set(hero1);
        this.hero2.set(hero2);
      } else {
        console.error('❌ Respuestas de API inválidas:', { response1, response2 });
        this.error.set('Error al cargar los superhéroes para el combate');
      }
    } catch (error: any) {
      console.error('Error loading heroes for combat:', error);
      this.error.set(error.error?.error || error.message || 'Error al cargar los superhéroes');
    } finally {
      this.loading.set(false);
    }
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


  // Utilidades compartidas
  protected readonly getPowerStatValue = parsePowerstat;
  protected readonly getPowerStatColor = (value: number) => getPowerstatColor(value);

  onRetry(): void {
    this.startNewCombat();
  }
}

