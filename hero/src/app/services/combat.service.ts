import { Injectable } from '@angular/core';
import { SuperHero } from '../interfaces/superhero.interface';
import { CombatResult, CombatStats } from '../interfaces/combat.interface';

@Injectable({
  providedIn: 'root'
})
export class CombatService {

  /**
   * Calcula el puntaje total de un héroe basándose en sus estadísticas de poder
   * 
   * Fórmula de cálculo:
   * - Inteligencia: peso 1.0 (base)
   * - Fuerza: peso 1.2 (importante para combate físico)
   * - Velocidad: peso 1.0 (base)
   * - Durabilidad: peso 1.0 (base)
   * - Poder: peso 1.0 (base)
   * - Combate: peso 1.5 (más importante, experiencia en pelea)
   * 
   * @param hero - El superhéroe a evaluar
   * @returns El puntaje total calculado
   */
  calculateHeroScore(hero: SuperHero): number {
    const stats = hero.powerstats;
    
    // Convertir strings a números, usar 0 si no es válido
    const intelligence = parseInt(stats.intelligence) || 0;
    const strength = parseInt(stats.strength) || 0;
    const speed = parseInt(stats.speed) || 0;
    const durability = parseInt(stats.durability) || 0;
    const power = parseInt(stats.power) || 0;
    const combat = parseInt(stats.combat) || 0;

    // Aplicar pesos especiales
    // Combate tiene el mayor peso (1.5) porque representa experiencia en pelea
    // Fuerza tiene peso 1.2 porque es crucial en combate físico
    return intelligence + 
           (strength * 1.2) + 
           speed + 
           durability + 
           power + 
           (combat * 1.5);
  }

  /**
   * Obtiene las estadísticas detalladas de un héroe para análisis
   * @param hero - El superhéroe a analizar
   * @returns Objeto con todas las estadísticas numéricas
   */
  getHeroStats(hero: SuperHero): CombatStats {
    const stats = hero.powerstats;
    
    const intelligence = parseInt(stats.intelligence) || 0;
    const strength = parseInt(stats.strength) || 0;
    const speed = parseInt(stats.speed) || 0;
    const durability = parseInt(stats.durability) || 0;
    const power = parseInt(stats.power) || 0;
    const combat = parseInt(stats.combat) || 0;
    
    const totalScore = this.calculateHeroScore(hero);

    return {
      intelligence,
      strength,
      speed,
      durability,
      power,
      combat,
      totalScore
    };
  }

  /**
   * Determina el ganador de un combate entre dos héroes
   * @param hero1 - Primer combatiente
   * @param hero2 - Segundo combatiente
   * @returns Resultado del combate con ganador, perdedor y estadísticas
   */
  determineWinner(hero1: SuperHero, hero2: SuperHero): CombatResult {
    const score1 = this.calculateHeroScore(hero1);
    const score2 = this.calculateHeroScore(hero2);

    const winner = score1 > score2 ? hero1 : hero2;
    const loser = score1 > score2 ? hero2 : hero1;
    const winnerScore = Math.max(score1, score2);
    const loserScore = Math.min(score1, score2);

    return {
      winner,
      loser,
      winnerScore,
      loserScore,
      margin: winnerScore - loserScore
    };
  }

  /**
   * Genera un ID aleatorio de superhéroe (1-731)
   * @returns ID aleatorio como string
   */
  getRandomSuperheroId(): string {
    const randomId = Math.floor(Math.random() * 731) + 1;
    return randomId.toString();
  }

  /**
   * Genera dos IDs diferentes de superhéroes para combate
   * @returns Array con dos IDs únicos
   */
  getRandomCombatIds(): [string, string] {
    const id1 = this.getRandomSuperheroId();
    let id2 = this.getRandomSuperheroId();
    
    // Asegurar que sean diferentes
    while (id1 === id2) {
      id2 = this.getRandomSuperheroId();
    }
    
    return [id1, id2];
  }

  /**
   * Simula un delay para efectos visuales
   * @param ms - Milisegundos de delay
   * @returns Promise que se resuelve después del delay
   */
  delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
