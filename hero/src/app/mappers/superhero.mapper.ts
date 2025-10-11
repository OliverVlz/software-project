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
    // Normalizar powerstats (puede venir null o con propiedades null)
    const apiPowerstats = response.powerstats;
    
    return {
      id: response.id || 'unknown',
      name: response.name || 'Superhero Desconocido',
      powerstats: {
        intelligence: apiPowerstats?.intelligence || '0',
        strength: apiPowerstats?.strength || '0',
        speed: apiPowerstats?.speed || '0',
        durability: apiPowerstats?.durability || '0',
        power: apiPowerstats?.power || '0',
        combat: apiPowerstats?.combat || '0',
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
        url: response.image?.url || '',
      },
    };
  }

  static mapResponseArrayToSuperheroes(responses: SuperHeroResponse[]): SuperHero[] {
    return responses
      .filter(response => response.response === 'success')
      .map(this.mapResponseToSuperhero);
  }

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

  static normalizePowerstat(value: string | undefined): number {
    return parseInt(value || '0') || 0;
  }
}
