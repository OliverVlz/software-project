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
  powerstats: ApiPowerstats | null;
  biography: Biography | null;
  appearance: Appearance | null;
  work: Work | null;
  connections: Connections | null;
  image: {
    url: string | null;
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