# Polla Mundial 2026

AplicaciÃ³n web gratuita para administrar pollas del Mundial 2026.

## Estructura general

La app permite:

- Login con nombre y cÃ³digo de participante.
- ParticipaciÃ³n en una o mÃ¡s pollas.
- PronÃ³sticos de fase de grupos.
- PronÃ³sticos de eliminaciÃ³n directa.
- Ranking por polla.
- Ranking separado por Total, Grupos y EliminaciÃ³n.
- Guardado de pronosticos en Render + Supabase.

## Archivos principales

- `index.html`: estructura visual de la app.
- `style.css`: estilos generales, responsive y diseÃ±o de tarjetas.
- `script.js`: logica del frontend, render de partidos, login, ranking, eliminacion y conexion con Render + Supabase.
- `api-client.js`: capa API del frontend hacia el backend Node/Supabase publicado en Render.
- `apps-script/Code.gs`: codigo historico de Google Apps Script. Queda obsoleto y no esta conectado a la app web.

## Backend

La app web usa Render + Supabase como backend principal.

El frontend apunta a:

```js
const API_MODE = "node";
const NODE_API_BASE_URL = "https://polla-mundial-2026-backend.onrender.com";
```

Google Sheets / Apps Script queda obsoleto y no es usado por el frontend. La carpeta `apps-script/` se conserva por referencia historica, pero la app web ya no llama a ese codigo.

## Modelo de datos historico

La version anterior usaba estas hojas de Google Sheets. Hoy estos datos viven en Supabase:

### Participantes

Columnas:

- CÃ³digo
- Nombre
- Activo

### Pollas

Columnas:

- ID Polla
- Nombre Polla
- Activa

### Participantes_Pollas

Columnas:

- CÃ³digo
- ID Polla
- Activo

### Pronosticos

Columnas:

- Fecha envÃ­o
- Usuario
- CÃ³digo
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
La hoja `Resultados` de fase de grupos queda sin uso por compatibilidad histÃ³rica.

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

Esta es la hoja oficial para fixture, horarios, equipos/placeholders, estado, resultados reales y clasificado real de eliminaciÃ³n directa.

### Pronosticos_Eliminacion

Columnas:

- Fecha envÃ­o
- Usuario
- CÃ³digo
- Partido ID
- Ronda
- Local
- Goles Local
- Goles Visita
- Visita
- Clasifica

La hoja `Resultados_Eliminacion` queda sin uso por compatibilidad histÃ³rica.

## Estados de partidos de eliminaciÃ³n

- Pendiente: todavÃ­a no se puede pronosticar.
- Abierto: se puede pronosticar.
- Cerrado: no se puede editar.
- Finalizado: ya tiene resultado real.

AdemÃ¡s, los partidos se bloquean automÃ¡ticamente 1 hora antes de comenzar.

## Reglas de puntaje fase de grupos

- 10 puntos por marcador exacto. Si es exacto, no suma otros criterios.
- Si no es exacto:
  - +3 por acertar ganador o empate.
  - +2 por acertar goles del local.
  - +2 por acertar goles del visitante.
  - +1 por acertar diferencia de gol.

## Reglas de puntaje eliminaciÃ³n directa

- 10 puntos por marcador exacto.
- +3 bonus si acierta el equipo que clasifica.
- MÃ¡ximo posible: 13 puntos.

Si no es exacto:

- +3 por acertar ganador o empate del marcador.
- +2 por acertar goles del local.
- +2 por acertar goles del visitante.
- +1 por acertar diferencia de gol.
- +3 por acertar equipo que clasifica.

## Pendientes principales

- Pulir diseÃ±o mÃ³vil.
- Destacar usuario actual en ranking.
- Agregar explicaciÃ³n de reglas dentro de la app.
- Crear vista de administraciÃ³n o instrucciones para abrir/cerrar partidos.
