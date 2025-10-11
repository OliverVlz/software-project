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

export interface SuperHeroResponse {
  response: string;
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

export interface SearchResponse {
  response: string;
  'results-for': string;
  results: SuperHero[];
}

export interface SuperHeroErrorResponse {
  response: string;
  error: string;
}

// Respuestas específicas de la API
export interface PowerstatsResponse {
  response: string;
  id: string;
  name: string;
  powerstats: Powerstats;
}

export interface BiographyResponse {
  response: string;
  id: string;
  name: string;
  biography: Biography;
}

export interface AppearanceResponse {
  response: string;
  id: string;
  name: string;
  appearance: Appearance;
}

export interface WorkResponse {
  response: string;
  id: string;
  name: string;
  work: Work;
}

export interface ConnectionsResponse {
  response: string;
  id: string;
  name: string;
  connections: Connections;
}

export interface ImageResponse {
  response: string;
  id: string;
  name: string;
  image: {
    url: string;
  };
}