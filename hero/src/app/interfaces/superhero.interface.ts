// ============================================
// INTERFACES DE RESPUESTA API (con nullables)
// ============================================

/**
 * Powerstats desde la API - pueden ser null o "null" (string)
 */
export interface ApiPowerstats {
  intelligence: string | null;
  strength: string | null;
  speed: string | null;
  durability: string | null;
  power: string | null;
  combat: string | null;
}

/**
 * Powerstats normalizadas - siempre string (después del mapper)
 */
export interface Powerstats {
  intelligence: string;
  strength: string;
  speed: string;
  durability: string;
  power: string;
  combat: string;
}

export interface Biography {
  'full-name': string;
  'alter-egos': string;
  aliases: string[];
  'place-of-birth': string;
  'first-appearance': string;
  publisher: string;
  alignment: string;
}

export interface Appearance {
  gender: string;
  race: string;
  height: string[];
  weight: string[];
  'eye-color': string;
  'hair-color': string;
}

export interface Work {
  occupation: string;
  base: string;
}

export interface Connections {
  'group-affiliation': string;
  relatives: string;
}

export interface SuperHero {
  id: string;
  name: string;
  powerstats: Powerstats;
  biography: Biography;
  appearance: Appearance;
  work: Work;
  connections: Connections;
  image: {
    url: string;
  };
}

/**
 * Respuesta de la API - campos pueden ser null
 */
export interface SuperHeroResponse {
  response: string;
  id: string;
  name: string;
  powerstats: ApiPowerstats | null;  // ✅ Puede ser null
  biography: Biography | null;        // ✅ Puede ser null
  appearance: Appearance | null;      // ✅ Puede ser null
  work: Work | null;                  // ✅ Puede ser null
  connections: Connections | null;    // ✅ Puede ser null
  image: {
    url: string | null;               // ✅ Puede ser null
  } | null;
}

export interface SearchResponse {
  response: string;
  'results-for': string;
  results: SuperHero[];
}

export interface SuperHeroErrorResponse {
  response: string;
  error: string;
}