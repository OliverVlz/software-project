/**
 * Constantes de estilos Tailwind para mantener consistencia
 * y evitar repetición de clases
 */
export const ALIGNMENT_COLORS = {
  good: 'bg-green-500/90 text-white',
  bad: 'bg-red-500/90 text-white',
  neutral: 'bg-yellow-500/90 text-white',
  unknown: 'bg-gray-500/90 text-white',
} as const;

export const POWERSTAT_COLORS = {
  high: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900',    // >= 80
  medium: 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900', // >= 60
  low: 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900',   // >= 40
  veryLow: 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900',         // < 40
} as const;
