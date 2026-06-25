# Plan de Refactorización: Dashboard "Foco" — Gestión de Hábitos (SPA)

## Objetivo
Refactorizar el proyecto React (`eva3/`) en un Dashboard SPA llamado **Foco** para gestión de hábitos y tareas diarias, cumpliendo los criterios de la Evaluación Sumativa 3.

## Estructura de Archivos

```
src/
  components/
    HabitList/HabitList.jsx        → lista de hábitos
    HabitItem/HabitItem.jsx        → un hábito individual
    WeekHeatmap/WeekHeatmap.jsx    → grid 7col × 4sem (28 días)
    AddHabitModal/AddHabitModal.jsx→ modal/formulario para crear hábito
    StatsPanel/StatsPanel.jsx      → métricas calculadas
    QuoteWidget/QuoteWidget.jsx    → consumo de API externa
    Toast/Toast.jsx                → notificación flotante
  hooks/
    useHabits.js                   → useReducer + localStorage + sanitización
    useApi.js                      → fetch con loading/error
  utils/
    dateHelpers.js                 → formatDate, getTodayKey, getLast28Days
    storage.js                     → saveHabits, loadHabits (try/catch)
  App.jsx                          → Layout principal
  App.css                          → Variables Magenta/Amarillo + animaciones
  index.js                         → Punto de entrada (main.jsx renombrado)
```

## Funcionalidades Core

| Funcionalidad | Detalle |
|---|---|
| **CRUD Hábitos + LocalStorage** | Crear, leer, toggle completado, eliminar. Persistencia automática |
| **API Pública** | Widget de frases motivacionales (quotable.io) |
| **WeekHeatmap** | Grid 7×4 (28 días) estilo GitHub |
| **StatsPanel** | Total completados, % consistencia, mejor racha |
| **Toast** | Notificaciones flotantes de feedback |

## Requisitos de Seguridad

- **Sanitización**: Eliminar `<`, `>`, scripts en nombre del hábito
- **Integridad LocalStorage**: `try/catch` en lectura/escritura; validar estructura
- **Manejo de errores API**: `try/catch`, estado `loading`, feedback visual

## Estado (useReducer)

```js
{
  habits: [{ id, name, color, createdAt, completions: { "YYYY-MM-DD": true } }],
  error: null
}
```

## UI y Animaciones

- **Bootstrap 5**: Layout con clases nativas
- **Colores**: Magenta (`#D81B60`) y Amarillo
- **Animaciones CSS** (respetando `prefers-reduced-motion`):
  - `heatFill` → celdas del heatmap
  - `slideUp` → modal entrada

## Archivos a Modificar/Eliminar

- `src/App.js` → reemplazar por `src/App.jsx`
- `src/index.js` → reemplazar por `src/main.jsx`
- `src/App.css` → reemplazar con nuevo diseño
- `public/index.html` → agregar Bootstrap CDN
- `src/logo.svg` → eliminar
- `src/reportWebVitals.js` → mantener (main.jsx lo usa opcionalmente)
- `src/App.test.js` → actualizar test
