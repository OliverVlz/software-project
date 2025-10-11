/**
 * Constantes de estilos Tailwind para mantener consistencia
 * y evitar repetición de clases
 */

export const CARD_STYLES = {
  base: 'bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700',
  hover: 'hover:border-gray-300 dark:hover:border-gray-600 transform hover:-translate-y-1',
  group: 'group',
} as const;

export const BUTTON_STYLES = {
  primary: 'px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300',
  secondary: 'px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300',
  link: 'text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300',
} as const;

export const TEXT_STYLES = {
  heading: 'text-2xl font-bold text-gray-900 dark:text-white',
  subheading: 'text-lg font-semibold text-gray-900 dark:text-white',
  body: 'text-sm text-gray-900 dark:text-white',
  label: 'text-sm font-medium text-gray-500 dark:text-gray-400',
  muted: 'text-sm text-gray-600 dark:text-gray-300',
} as const;

export const GRADIENT_STYLES = {
  blueToBlack: 'bg-gradient-to-t from-black/80 via-black/30 to-transparent',
  grayBackground: 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800',
  blueToPurple: 'bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900',
} as const;

export const LOADING_STYLES = {
  spinner: 'animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600',
  skeleton: 'animate-pulse bg-gray-300 dark:bg-gray-600',
} as const;

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

export const CONTAINER_STYLES = {
  page: 'container mx-auto px-4 py-8',
  section: 'mb-8',
  grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6',
} as const;
