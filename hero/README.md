# Hero - Aplicación de Superhéroes

## ¿Qué hace el proyecto?

Esta aplicación web permite explorar y comparar superhéroes de manera interactiva. Los usuarios pueden:

- **Ver superhéroes aleatorios** en la página principal
- **Explorar una galería completa** de superhéroes con paginación
- **Buscar superhéroes** por nombre
- **Simular combates** entre dos superhéroes aleatorios
- **Analizar estadísticas** detalladas de cada personaje

La aplicación utiliza la API de SuperHero para obtener datos reales de más de 700 superhéroes diferentes.

## Tecnologías utilizadas

- **Angular 20.3.0** - Framework principal
- **TypeScript 5.9.2** - Lenguaje de programación
- **RxJS 7.8.0** - Programación reactiva
- **Tailwind CSS 3.4.18** - Framework de estilos
- **Angular CLI 20.3.4** - Herramientas de desarrollo
- **Karma & Jasmine** - Testing
- **SuperHero API** - Fuente de datos

## Endpoints consumidos

La aplicación consume la **SuperHero API** a través de los siguientes endpoints:

- `GET /api/{apiKey}/{id}` - Obtener superhéroe por ID
- `GET /api/{apiKey}/search/{name}` - Buscar superhéroes por nombre

**Configuración de proxy:**
- `/api` → `https://www.superheroapi.com/api.php`
- `/images` → `https://www.superherodb.com`

## Estructura de carpetas

```
src/app/
├── components/          # Componentes reutilizables
├── constants/           # Constantes de la aplicación
├── interceptors/        # Interceptores HTTP
├── interfaces/          # Definiciones de tipos TypeScript
├── mappers/            # Transformadores de datos
├── pages/              # Páginas principales de la aplicación
├── pipes/              # Pipes personalizados
├── services/           # Servicios de lógica de negocio
└── utils/              # Utilidades y funciones auxiliares
```

## Páginas de la aplicación

### 🏠 **Home** (`/home`)
- **Propósito**: Página principal que muestra un superhéroe aleatorio
- **Funcionalidad**: 
  - Carga automáticamente un superhéroe aleatorio al iniciar
  - Muestra información detallada del personaje
  - Permite recargar para obtener otro superhéroe aleatorio
  - Incluye estadísticas de poder visualizadas con colores

### 👥 **Heroes** (`/heroes`)
- **Propósito**: Galería completa de superhéroes con funcionalidades de búsqueda
- **Funcionalidad**:
  - Lista paginada de superhéroes (8 por página)
  - Primera página muestra héroes famosos (Batman, Superman, etc.)
  - Búsqueda en tiempo real por nombre
  - Navegación entre páginas
  - Vista detallada de cada superhéroe al hacer clic

### ⚔️ **Combat** (`/combat`)
- **Propósito**: Simulador de combates entre superhéroes
- **Funcionalidad**:
  - Selecciona automáticamente dos superhéroes aleatorios diferentes
  - Simula un combate con animación
  - Calcula el ganador basándose en estadísticas de poder
  - Muestra resultado detallado con puntuaciones
  - Permite iniciar un nuevo combate

## Interfaces

### **SuperHero Interface**
Define la estructura completa de un superhéroe:
- **Datos básicos**: ID, nombre, imagen
- **Powerstats**: Inteligencia, fuerza, velocidad, durabilidad, poder, combate
- **Biografía**: Nombre completo, alter-egos, aliases, lugar de nacimiento
- **Apariencia**: Género, raza, altura, peso, color de ojos/cabello
- **Trabajo**: Ocupación, base de operaciones
- **Conexiones**: Afiliaciones grupales, familiares

### **Combat Interface**
Maneja la lógica de combates:
- **CombatResult**: Resultado del combate (ganador, perdedor, puntuaciones)
- **CombatStats**: Estadísticas numéricas para análisis de combate

## Servicios

### **SuperHeroService**
- **Función**: Gestiona todas las operaciones relacionadas con superhéroes
- **Métodos principales**:
  - `getHeroById()` - Obtiene un superhéroe específico por ID
  - `searchHeroesByName()` - Busca superhéroes por nombre
  - `getHeroesByPage()` - Obtiene héroes paginados
- **Características**:
  - Sistema de caché para optimizar rendimiento
  - Manejo de errores robusto
  - Estados reactivos con Signals

### **CombatService**
- **Función**: Lógica de combate y cálculos de estadísticas
- **Métodos principales**:
  - `calculateHeroScore()` - Calcula puntuación total del héroe
  - `determineWinner()` - Determina el ganador del combate
  - `getRandomCombatIds()` - Genera IDs aleatorios para combate
- **Características**:
  - Fórmula de cálculo ponderada para estadísticas
  - Generación de combates aleatorios
  - Análisis detallado de capacidades

### **CacheService**
- **Función**: Sistema de caché para optimizar las consultas a la API
- **Características**:
  - Almacenamiento temporal de datos
  - Tiempo de expiración configurable
  - Estadísticas de uso del caché

## Instalación y ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm start

# Ejecutar sin proxy (si hay problemas de CORS)
npm run start:no-proxy

# Compilar para producción
npm run build
```

La aplicación estará disponible en `http://localhost:4200/`
