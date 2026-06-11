# Polla Mundial 2026

Aplicación web gratuita para administrar pollas del Mundial 2026.

## Estructura general

La app permite:

- Login con nombre y código de participante.
- Participación en una o más pollas.
- Pronósticos de fase de grupos.
- Pronósticos de eliminación directa.
- Ranking por polla.
- Ranking separado por Total, Grupos y Eliminación.
- Guardado de pronósticos en Render + Supabase.

## Archivos principales

- `index.html`: estructura visual de la app.
- `style.css`: estilos generales, responsive y diseño de tarjetas.
- `script.js`: lógica del frontend, render de partidos, login, ranking, eliminación y conexión con Render + Supabase.
- `api-client.js`: capa API del frontend hacia el backend Node/Supabase publicado en Render.
- `apps-script/Code.gs`: código histórico de Google Apps Script. Queda obsoleto y no está conectado a la app web.

## Backend

La app web usa Render + Supabase como backend principal.

El frontend apunta a:

```js
const API_MODE = "node";
const NODE_API_BASE_URL = "https://polla-mundial-2026-backend.onrender.com";
```

Google Sheets / Apps Script queda obsoleto y no es usado por el frontend. La carpeta `apps-script/` se conserva por referencia histórica, pero la app web ya no llama a ese código.

## Modelo de datos histórico

La versión anterior usaba estas hojas de Google Sheets. Hoy estos datos viven en Supabase:

### Participantes

Columnas:

- Código
- Nombre
- Activo

### Pollas

Columnas:

- ID Polla
- Nombre Polla
- Activa

### Participantes_Pollas

Columnas:

- Código
- ID Polla
- Activo

### Pronosticos

Columnas:

- Fecha envío
- Usuario
- Código
- Partido ID
- Grupo
- Local
- Goles Local
- Goles Visita
- Visita

### Partidos

Columnas:

- Partido ID
- Grupo
- Fecha
- Hora
- Local
- Visita
- Goles Local Real
- Goles Visita Real
- Estado

Esta es la hoja oficial para fixture, horarios, estado y resultados reales de fase de grupos.
La hoja `Resultados` de fase de grupos queda sin uso por compatibilidad histórica.

### Llaves

Columnas:

- Partido ID
- Ronda
- Fecha
- Hora
- Local Placeholder
- Local
- Visita Placeholder
- Visita
- Goles Local Real
- Goles Visita Real
- Clasifica Real
- Estado

Esta es la hoja oficial para fixture, horarios, equipos/placeholders, estado, resultados reales y clasificado real de eliminación directa.

### Pronosticos_Eliminacion

Columnas:

- Fecha envío
- Usuario
- Código
- Partido ID
- Ronda
- Local
- Goles Local
- Goles Visita
- Visita
- Clasifica

La hoja `Resultados_Eliminacion` queda sin uso por compatibilidad histórica.

## Estados de partidos de eliminación

- Pendiente: todavía no se puede pronosticar.
- Abierto: se puede pronosticar.
- Cerrado: no se puede editar.
- Finalizado: ya tiene resultado real.

Además, los partidos se bloquean automáticamente 30 minutos antes de comenzar.

## Reglas de puntaje fase de grupos

- 10 puntos por marcador exacto. Si es exacto, no suma otros criterios.
- Si no es exacto:
  - +3 por acertar ganador o empate.
  - +2 por acertar goles del local.
  - +2 por acertar goles del visitante.
  - +1 por acertar diferencia de gol.

## Reglas de puntaje eliminación directa

- 10 puntos por marcador exacto.
- +3 bonus si acierta el equipo que clasifica.
- Máximo posible: 13 puntos.

Si no es exacto:

- +3 por acertar ganador o empate del marcador.
- +2 por acertar goles del local.
- +2 por acertar goles del visitante.
- +1 por acertar diferencia de gol.
- +3 por acertar equipo que clasifica.

## Pendientes principales

- Pulir diseño móvil.
- Destacar usuario actual en ranking.
- Agregar explicación de reglas dentro de la app.
- Crear vista de administración o instrucciones para abrir/cerrar partidos.
