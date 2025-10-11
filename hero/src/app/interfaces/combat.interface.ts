import { SuperHero } from './superhero.interface';

export interface CombatResult {
  winner: SuperHero;
  loser: SuperHero;
  winnerScore: number;
  loserScore: number;
  margin: number;
}

export interface CombatStats {
  intelligence: number;
  strength: number;
  speed: number;
  durability: number;
  power: number;
  combat: number;
  totalScore: number;
}
