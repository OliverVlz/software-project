# 🥊 Guía del Sistema de Combate

## 📊 Cálculo de Fuerza y Estadísticas

### Fórmula de Poder Total:
```
Poder Total = Inteligencia + (Fuerza × 1.2) + Velocidad + Durabilidad + Poder + (Combate × 1.5)
```

### Pesos de las Estadísticas:
- **Combate**: 1.5x (más importante - experiencia en pelea)
- **Fuerza**: 1.2x (importante para combate físico)
- **Inteligencia**: 1.0x (base)
- **Velocidad**: 1.0x (base)
- **Durabilidad**: 1.0x (base)
- **Poder**: 1.0x (base)

### Ejemplo de Cálculo:
```
Superman:
- Inteligencia: 94
- Fuerza: 100 × 1.2 = 120
- Velocidad: 100
- Durabilidad: 100
- Poder: 100
- Combate: 85 × 1.5 = 127.5
- TOTAL: 641.5

Batman:
- Inteligencia: 100
- Fuerza: 26 × 1.2 = 31.2
- Velocidad: 27
- Durabilidad: 50
- Poder: 47
- Combate: 100 × 1.5 = 150
- TOTAL: 404.2
```

## 🔄 Flujo del Componente de Combate

### 1. **Inicialización** (`ngOnInit`)
```
startNewCombat() → Cargar 2 héroes aleatorios → Mostrar en UI
```

### 2. **Carga de Héroes** (`startNewCombat`)
```
1. Obtener IDs aleatorios únicos (CombatService.getRandomCombatIds())
2. Cargar héroes en paralelo (SuperHeroService.getHeroById())
3. Mapear respuestas a objetos SuperHero
4. Actualizar signals: hero1, hero2, loading, error
```

### 3. **Combate** (`fight`)
```
1. Verificar que ambos héroes estén cargados
2. Activar estado de pelea (isFighting = true)
3. Simular delay de 2 segundos (CombatService.delay())
4. Calcular puntajes (CombatService.calculateHeroScore())
5. Determinar ganador (CombatService.determineWinner())
6. Mostrar resultado (showResult = true)
```

### 4. **Cálculo de Ganador** (`CombatService.determineWinner`)
```
1. Calcular score1 = calculateHeroScore(hero1)
2. Calcular score2 = calculateHeroScore(hero2)
3. Comparar scores
4. Retornar CombatResult con ganador, perdedor y estadísticas
```

## 🏗️ Arquitectura del Sistema

### Servicios:
- **SuperHeroService**: Consume API de superhéroes
- **CombatService**: Lógica de combate y cálculos

### Interfaces:
- **SuperHero**: Estructura del héroe (ya existente)
- **CombatResult**: Resultado del combate
- **CombatStats**: Estadísticas detalladas para análisis

### Componente:
- **Combat**: UI y coordinación de servicios

## 📡 Flujo de Datos

```
API SuperHero → SuperHeroService → Combat Component → CombatService → UI
     ↓              ↓                    ↓              ↓
  JSON Response → Observable → Signals → Cálculos → Template
```

## 🎯 Estados del Componente

### Signals:
- `hero1`: SuperHero | null
- `hero2`: SuperHero | null
- `loading`: boolean
- `error`: string | null
- `combatResult`: CombatResult | null
- `showResult`: boolean
- `isFighting`: boolean

### Flujo de Estados:
```
Inicial → Cargando → Mostrando Héroes → Peleando → Mostrando Resultado
   ↓         ↓            ↓              ↓            ↓
loading=true  loading=false  isFighting=true  isFighting=false  showResult=true
```

## 🔧 Métodos Principales

### CombatService:
- `calculateHeroScore(hero)`: Calcula poder total
- `getHeroStats(hero)`: Obtiene estadísticas detalladas
- `determineWinner(hero1, hero2)`: Determina ganador
- `getRandomCombatIds()`: Genera IDs únicos
- `delay(ms)`: Simula delay

### Combat Component:
- `startNewCombat()`: Inicia nuevo combate
- `fight()`: Ejecuta combate
- `onRetry()`: Reinicia combate
- `getPowerStatValue(stat)`: Convierte string a número
- `getPowerStatColor(value)`: Retorna color según valor

## 🎨 UI States

### 1. **Loading State**
- Skeleton cards para ambos héroes
- Spinner en botón de pelear

### 2. **Ready State**
- Cards de héroes con información
- Botón "¡PELEAR!" activo

### 3. **Fighting State**
- Animación de "shake" en cards
- Botón con spinner "¡Luchando!"
- Texto "VS" con efecto pulse

### 4. **Result State**
- Ganador con badge dorado y efecto de brillo
- Perdedor con opacidad reducida
- Card de resultado con estadísticas
- Botón "Nuevo Combate"

## 🚀 Uso del Sistema

1. **Navegar a `/combat`**
2. **Esperar carga de héroes** (automática)
3. **Hacer clic en "¡PELEAR!"**
4. **Ver animación de pelea** (2 segundos)
5. **Revisar resultado** con estadísticas
6. **Hacer clic en "Nuevo Combate"** para repetir

## 📈 Ventajas del Diseño

- **Separación de responsabilidades**: Lógica en servicios, UI en componente
- **Reutilizable**: CombatService puede usarse en otros componentes
- **Testeable**: Servicios independientes fáciles de testear
- **Mantenible**: Código organizado y documentado
- **Escalable**: Fácil agregar nuevas funcionalidades
