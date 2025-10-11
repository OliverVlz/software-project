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
    // Normalizar powerstats (puede venir null o con propiedades "null" como string)
    const apiPowerstats = response.powerstats;

    // ✅ Función helper para normalizar valores de powerstats
    const normalizePowerstat = (value: string | null | undefined): string => {
      if (value === null || value === undefined) return '0';
      if (typeof value === 'string' && value.toLowerCase() === 'null') return '0';
      return value;
    };

    return {
      id: response.id || 'unknown',
      name: response.name || 'Superhero Desconocido',
      powerstats: {
        intelligence: normalizePowerstat(apiPowerstats?.intelligence),
        strength: normalizePowerstat(apiPowerstats?.strength),
        speed: normalizePowerstat(apiPowerstats?.speed),
        durability: normalizePowerstat(apiPowerstats?.durability),
        power: normalizePowerstat(apiPowerstats?.power),
        combat: normalizePowerstat(apiPowerstats?.combat),
      },
      biography: {
        'full-name': response.biography?.['full-name'] || '',
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
      this.normalizePowerstat(stats.intelligence) + 
      this.normalizePowerstat(stats.strength) +
      this.normalizePowerstat(stats.speed) + 
      this.normalizePowerstat(stats.durability) +
      this.normalizePowerstat(stats.power) + 
      this.normalizePowerstat(stats.combat);
    
    return Math.round(total / 6);
  }

  static normalizePowerstat(value: string | null | undefined): number {
    if (value === null || value === undefined) return 0;
    if (typeof value === 'string' && value.toLowerCase() === 'null') return 0;
    const parsed = parseInt(value);
    return isNaN(parsed) ? 0 : parsed;
  }
}
