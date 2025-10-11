import { ALIGNMENT_COLORS, POWERSTAT_COLORS } from '../constants/styles.constants';

/**
 * Utilidades compartidas para lógica relacionada con superhéroes
 */

export type AlignmentType = 'good' | 'bad' | 'neutral';

/**
 * Obtiene el color de alineación según el tipo
 */
export function getAlignmentColor(alignment: string): string {
  const normalizedAlignment = alignment?.toLowerCase() as AlignmentType;
  
  switch (normalizedAlignment) {
    case 'good':
      return ALIGNMENT_COLORS.good;
    case 'bad':
      return ALIGNMENT_COLORS.bad;
    case 'neutral':
      return ALIGNMENT_COLORS.neutral;
    default:
      return ALIGNMENT_COLORS.unknown;
  }
}

/**
 * Obtiene la etiqueta de alineación en español
 */
export function getAlignmentLabel(alignment: string): string {
  const normalizedAlignment = alignment?.toLowerCase();
  
  switch (normalizedAlignment) {
    case 'good':
      return 'Héroe';
    case 'bad':
      return 'Villano';
    default:
      return 'Desconocido';
  }
}

/**
 * Obtiene el color de un powerstat según su valor
 */
export function getPowerstatColor(value: number): string {
  if (value >= 80) return POWERSTAT_COLORS.high;
  if (value >= 60) return POWERSTAT_COLORS.medium;
  if (value >= 40) return POWERSTAT_COLORS.low;
  return POWERSTAT_COLORS.veryLow;
}

/**
 * Convierte un string de powerstat a número
 */
export function parsePowerstat(stat: string | null | undefined): number {
  if (stat === null || stat === undefined) return 0;
  if (typeof stat === 'string' && stat.toLowerCase() === 'null') return 0;
  const parsed = Number.parseFloat(stat);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Calcula el nivel de poder promedio
 */
export function calculateAveragePowerLevel(powerstats: {
  intelligence: string;
  strength: string;
  speed: string;
  durability: string;
  power: string;
  combat: string;
}): number {
  const total = 
    parsePowerstat(powerstats.intelligence) +
    parsePowerstat(powerstats.strength) +
    parsePowerstat(powerstats.speed) +
    parsePowerstat(powerstats.durability) +
    parsePowerstat(powerstats.power) +
    parsePowerstat(powerstats.combat);
  
  return Math.round(total / 6);
}

/**
 * Obtiene el nivel de clasificación por poder
 */
export function getPowerRank(averagePower: number): string {
  if (averagePower >= 90) return 'S';
  if (averagePower >= 80) return 'A';
  if (averagePower >= 70) return 'B';
  if (averagePower >= 60) return 'C';
  if (averagePower >= 50) return 'D';
  return 'E';
}

/**
 * Valida si una imagen URL es válida
 */
export function isValidImageUrl(url: string | undefined): boolean {
  return !!url && url.trim() !== '';
}
