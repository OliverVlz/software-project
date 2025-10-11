import { SuperHero, SuperHeroResponse } from '../interfaces/superhero.interface';

/**
 * Mapper para transformar datos de la API de Superhéroes
 * Centraliza la lógica de transformación y normalización de datos
 */
export class SuperheroMapper {
  
  /**
   * Mapea una respuesta individual de la API a un SuperHero
   * Maneja valores null/undefined con valores por defecto seguros
   */
  static mapResponseToSuperhero(response: SuperHeroResponse): SuperHero {
    return {
      id: response.id || 'unknown',
      name: response.name || 'Superhero Desconocido',
      powerstats: {
        intelligence: response.powerstats?.intelligence || '0',
        strength: response.powerstats?.strength || '0',
        speed: response.powerstats?.speed || '0',
        durability: response.powerstats?.durability || '0',
        power: response.powerstats?.power || '0',
        combat: response.powerstats?.combat || '0',
      },
      biography: {
        'full-name': response.biography?.['full-name'] || 'Desconocido',
        'alter-egos': response.biography?.['alter-egos'] || 'No tiene',
        aliases: response.biography?.aliases || [],
        'place-of-birth': response.biography?.['place-of-birth'] || 'Desconocido',
        'first-appearance': response.biography?.['first-appearance'] || 'Desconocido',
        publisher: response.biography?.publisher || 'Desconocido',
        alignment: response.biography?.alignment || 'neutral',
      },
      appearance: response.appearance || {
        gender: 'Desconocido',
        race: 'Desconocido',
        height: ['0'],
        weight: ['0'],
        'eye-color': 'Desconocido',
        'hair-color': 'Desconocido',
      },
      work: response.work || {
        occupation: 'Desconocido',
        base: 'Desconocido',
      },
      connections: response.connections || {
        'group-affiliation': 'Ninguna',
        relatives: 'Ninguno',
      },
      image: {
        // El pipe imageProxy manejará strings vacíos con placeholder
        url: response.image?.url || '',
      },
    };
  }

  /**
   * Mapea un array de respuestas a un array de SuperHero
   */
  static mapResponseArrayToSuperheroes(responses: SuperHeroResponse[]): SuperHero[] {
    return responses
      .filter(response => response.response === 'success')
      .map(this.mapResponseToSuperhero);
  }

  /**
   * Calcula el nivel de poder promedio de un superhéroe
   */
  static calculatePowerLevel(hero: SuperHero): number {
    const stats = hero.powerstats;
    const total = 
      parseInt(stats.intelligence || '0') + 
      parseInt(stats.strength || '0') +
      parseInt(stats.speed || '0') + 
      parseInt(stats.durability || '0') +
      parseInt(stats.power || '0') + 
      parseInt(stats.combat || '0');
    
    return Math.round(total / 6);
  }

  /**
   * Normaliza un valor de powerstat
   */
  static normalizePowerstat(value: string | undefined): number {
    return parseInt(value || '0') || 0;
  }
}
