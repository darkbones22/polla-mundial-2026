# Backend Polla Mundial 2026

Backend Node.js para migrar la app desde Google Sheets + Apps Script hacia Supabase.

Esta carpeta esta aislada de la app actual. En esta etapa solo incluye la base del servidor, el cliente Supabase y endpoints de salud.

## Requisitos

- Node.js 18 o superior.
- Proyecto Supabase creado.
- Variables de entorno configuradas en `.env`.

## Instalacion

```bash
npm install
```

## Configurar variables de entorno

Crear un archivo `.env` desde el ejemplo:

```bash
cp .env.example .env
```

En Windows PowerShell:

```powershell
copy .env.example .env
```

Variables necesarias:

- `NODE_ENV`
- `PORT`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `JWT_SECRET`
- `CORS_ORIGINS`

La variable `SUPABASE_SERVICE_ROLE_KEY` debe quedar solo en el backend. No debe exponerse en el frontend.

## Ejecutar localmente

```bash
npm run dev
```

Por defecto el backend queda en:

```text
http://localhost:3001
```

## Probar salud del backend

```text
GET http://localhost:3001/api/health
```

Respuesta esperada:

```json
{
  "ok": true,
  "servicio": "polla-mundial-2026-backend",
  "estado": "operativo",
  "timestamp": "..."
}
```

## Preparar Supabase

El archivo `supabase/schema.sql` contiene el esquema inicial en español:

- `participantes`
- `pollas`
- `participantes_pollas`
- `partidos_grupos`
- `partidos_eliminacion`
- `pronosticos_grupos`
- `pronosticos_eliminacion`
- `configuracion_app`

Para ejecutarlo:

1. Abrir el proyecto en Supabase.
2. Ir a SQL Editor.
3. Copiar el contenido de `supabase/schema.sql`.
4. Ejecutarlo manualmente.

El archivo no se ejecuta automaticamente desde Node.js.

## Probar conexion Supabase

Despues de ejecutar `schema.sql` y configurar `.env`:

```text
GET http://localhost:3001/api/health/supabase
```

Respuesta esperada:

```json
{
  "ok": true,
  "supabase": "conectado"
}
```

Si falla, la respuesta sera controlada:

```json
{
  "ok": false,
  "error": "No se pudo conectar con Supabase o falta ejecutar el esquema inicial."
}
```

## Estado actual

Todavia no estan implementados los endpoints reales de login, pollas, partidos, pronosticos, ranking ni resultados.

La logica de puntajes esta aislada en `src/services/puntaje.service.js` y cuenta con tests basicos.

## Endpoints read-only basicos

### Login de prueba

```text
POST http://localhost:3001/api/login
```

Body:

```json
{
  "codigo": "agu-1111"
}
```

Respuesta esperada:

```json
{
  "ok": true,
  "participante": {
    "id": "...",
    "codigoLegacy": "agu-1111",
    "nombre": "..."
  },
  "pollas": [
    {
      "id": "...",
      "idLegacy": "...",
      "nombre": "..."
    }
  ],
  "token": "..."
}
```

En esta etapa el login usa `codigo_legacy` y el hash temporal `legacy:{codigo}` generado durante la migracion. Bcrypt real queda para una etapa posterior.

### Pollas del participante autenticado

```text
GET http://localhost:3001/api/pollas
```

Header:

```text
Authorization: Bearer TOKEN_DEL_LOGIN
```

Respuesta:

```json
{
  "ok": true,
  "pollas": []
}
```

### Partidos de grupos

```text
GET http://localhost:3001/api/partidos/grupos
```

Devuelve partidos ordenados por `fechaHora` ascendente.

### Partidos de eliminacion

```text
GET http://localhost:3001/api/partidos/eliminacion
```

Devuelve llaves ordenadas por `fechaHora` ascendente.

## Endpoints read-only de pronosticos, resultados y ranking

Estos endpoints no guardan datos. Solo leen desde Supabase.

### Preparar token en PowerShell

```powershell
$login = Invoke-RestMethod `
  -Method Post `
  -Uri "http://localhost:3001/api/login" `
  -ContentType "application/json" `
  -Body '{"codigo":"agu-1111"}'

$token = $login.token
$pollaId = $login.pollas[0].id
$headers = @{ Authorization = "Bearer $token" }
```

### Pronosticos de grupos

```powershell
Invoke-RestMethod `
  -Method Get `
  -Uri "http://localhost:3001/api/pronosticos/grupos?pollaId=$pollaId" `
  -Headers $headers
```

Respuesta:

```json
{
  "ok": true,
  "pronosticos": [
    {
      "partidoId": "GA1",
      "golesLocal": 1,
      "golesVisita": 1
    }
  ]
}
```

### Pronosticos de eliminacion

```powershell
Invoke-RestMethod `
  -Method Get `
  -Uri "http://localhost:3001/api/pronosticos/eliminacion?pollaId=$pollaId" `
  -Headers $headers
```

Respuesta:

```json
{
  "ok": true,
  "pronosticos": [
    {
      "partidoId": "K73",
      "golesLocal": 1,
      "golesVisita": 1,
      "clasificadoLado": "local"
    }
  ]
}
```

### Resultados de grupos

```powershell
Invoke-RestMethod `
  -Method Get `
  -Uri "http://localhost:3001/api/resultados?tipo=grupos"
```

### Resultados de eliminacion

```powershell
Invoke-RestMethod `
  -Method Get `
  -Uri "http://localhost:3001/api/resultados?tipo=eliminacion"
```

### Ranking de una polla

```powershell
Invoke-RestMethod `
  -Method Get `
  -Uri "http://localhost:3001/api/ranking?pollaId=$pollaId" `
  -Headers $headers
```

El ranking devuelve una lista con campos compatibles con los detalles actuales:

- `puntosGrupos`
- `puntosEliminacion`
- `puntosTotal`
- `exactosGrupos`
- `exactosEliminacion`
- `ganadorEmpateGrupos`
- `ganadorEmpateEliminacion`
- `diferenciaGrupos`
- `diferenciaEliminacion`
- `clasificados`
- `partidosGrupos`
- `partidosEliminacion`

El backend valida que el participante autenticado pertenezca a la polla antes de entregar pronosticos o ranking.

### Detalle de partido de grupos

```powershell
Invoke-RestMethod `
  -Method Get `
  -Uri "http://localhost:3001/api/detalle-partido?pollaId=$pollaId&partidoId=GA1&tipo=grupos" `
  -Headers $headers
```

### Detalle de partido de eliminacion

```powershell
Invoke-RestMethod `
  -Method Get `
  -Uri "http://localhost:3001/api/detalle-partido?pollaId=$pollaId&partidoId=K73&tipo=eliminacion" `
  -Headers $headers
```

El detalle devuelve:

- `partido`
- `resultadoFinalizado`
- `estadoDetalle`
- `detalle` con participantes, pronostico, puntos y detalle de puntos

Si el partido esta finalizado con resultado real valido, el detalle se ordena por puntos descendente y luego nombre.

Si el partido esta pendiente o sin resultado completo, devuelve `puntos: 0`, `detallePuntos: null` y ordena por nombre.

## Endpoints de guardado de pronosticos

Estos endpoints guardan en Supabase, pero todavia no estan conectados al frontend actual.

Preparar token:

```powershell
$login = Invoke-RestMethod `
  -Method Post `
  -Uri "http://localhost:3001/api/login" `
  -ContentType "application/json" `
  -Body '{"codigo":"agu-1111"}'

$token = $login.token
$pollaId = $login.pollas[0].id
$headers = @{ Authorization = "Bearer $token" }
```

### Guardar pronostico de grupos

```powershell
$body = @{
  pollaId = $pollaId
  pronosticos = @(
    @{
      partidoId = "GA1"
      golesLocal = 2
      golesVisita = 1
    }
  )
} | ConvertTo-Json -Depth 5

Invoke-RestMethod `
  -Method Post `
  -Uri "http://localhost:3001/api/pronosticos/grupos" `
  -Headers $headers `
  -ContentType "application/json" `
  -Body $body
```

### Guardar pronostico de eliminacion con empate

```powershell
$body = @{
  pollaId = $pollaId
  pronosticos = @(
    @{
      partidoId = "K73"
      golesLocal = 1
      golesVisita = 1
      clasificadoLado = "local"
    }
  )
} | ConvertTo-Json -Depth 5

Invoke-RestMethod `
  -Method Post `
  -Uri "http://localhost:3001/api/pronosticos/eliminacion" `
  -Headers $headers `
  -ContentType "application/json" `
  -Body $body
```

### Guardar pronostico de eliminacion con ganador

```powershell
$body = @{
  pollaId = $pollaId
  pronosticos = @(
    @{
      partidoId = "K73"
      golesLocal = 2
      golesVisita = 1
    }
  )
} | ConvertTo-Json -Depth 5

Invoke-RestMethod `
  -Method Post `
  -Uri "http://localhost:3001/api/pronosticos/eliminacion" `
  -Headers $headers `
  -ContentType "application/json" `
  -Body $body
```

Respuesta esperada:

```json
{
  "ok": true,
  "guardados": 1,
  "omitidos": 0,
  "errores": []
}
```

El guardado es parcial: si algunos pronosticos son validos y otros estan cerrados o tienen errores, guarda los validos y devuelve los omitidos en `errores`.

## Importar datos desde CSV

La importacion esta preparada para CSV exportados manualmente desde Google Sheets.

Los CSV deben ir en:

```text
backend/data/csv/
```

Nombres esperados:

- `participantes.csv`
- `pollas.csv`
- `participantes_pollas.csv`
- `partidos.csv`
- `llaves.csv`
- `pronosticos.csv`
- `pronosticos_eliminacion.csv`

Los CSV reales pueden contener codigos y datos sensibles. Estan ignorados por Git mediante `.gitignore`.

### Exportar CSV desde Google Sheets

Para cada hoja:

1. Abrir la hoja en Google Sheets.
2. Ir a Archivo > Descargar > Valores separados por comas (.csv).
3. Guardar el archivo con el nombre esperado dentro de `backend/data/csv/`.

### Ejecutar dry-run

El dry-run lee y valida los CSV, muestra resumen y errores, pero no escribe en Supabase.

```bash
npm run importar:dry
```

En PowerShell, si `npm` queda bloqueado por politica local:

```powershell
npm.cmd run importar:dry
```

### Ejecutar import real

El import real hace `upsert` en Supabase. No borra datos automaticamente.

```bash
npm run importar
```

En PowerShell:

```powershell
npm.cmd run importar
```

### Mapeo general

`Participantes` hacia `participantes`:

- codigo legacy -> `codigo_legacy`
- nombre -> `nombre_visible`
- activo -> `activo`
- codigo hash -> `codigo_hash`

El `codigo_legacy` se normaliza con `trim()` y minusculas. Por ejemplo, `Gas-7015` y `gas-7015` se tratan como el mismo participante y se importan como `gas-7015`.

Si no viene `codigo_hash`, el importador usa temporalmente `legacy:{codigo}` y deja una advertencia. Antes de produccion debe reemplazarse por un hash real.

`Pollas` hacia `pollas`:

- id legacy -> `id_legacy`
- nombre -> `nombre`
- activa -> `activa`

Si falta `id_legacy`, el importador crea un valor temporal basado en el nombre y deja una advertencia.

`Participantes_Pollas` hacia `participantes_pollas`:

- busca participante por `codigo_legacy`
- busca polla por `id_legacy` o nombre
- crea relacion `polla_id` + `participante_id`

`Partidos` hacia `partidos_grupos`:

- partido id -> `id`
- grupo -> `grupo`
- fecha + hora -> `fecha_hora`
- local -> `equipo_local`
- visita -> `equipo_visita`
- goles reales -> `goles_local_real`, `goles_visita_real`
- estado -> `estado`

`Llaves` hacia `partidos_eliminacion`:

- partido id -> `id`
- ronda -> `ronda`
- fecha + hora -> `fecha_hora`
- placeholders/equipos -> `placeholder_local`, `equipo_local`, `placeholder_visita`, `equipo_visita`
- goles reales -> `goles_local_real`, `goles_visita_real`
- clasificado real -> `clasificado_real_lado`
- estado -> `estado`

`Pronosticos` hacia `pronosticos_grupos`:

- participante por codigo legacy
- partido por id
- goles local/visita
- polla por columna de polla si existe; si no existe, se replica en las pollas activas del participante segun `participantes_pollas.csv`

`Pronosticos_Eliminacion` hacia `pronosticos_eliminacion`:

- participante por codigo legacy
- partido por id
- goles local/visita
- clasificado -> `clasificado_lado`
- polla por columna de polla si existe; si no existe, se replica en las pollas activas del participante segun `participantes_pollas.csv`

### Clasificados en eliminacion

El importador no guarda nombres de equipos como clasificado.

Si el CSV trae el nombre del clasificado, lo transforma a:

- `local`, si coincide con `equipo_local` o `placeholder_local`
- `visita`, si coincide con `equipo_visita` o `placeholder_visita`

Si no puede determinar el lado, muestra error y no importa ese registro.

### Validaciones

El importador valida:

- IDs requeridos.
- fechas y horas validas.
- goles enteros `>= 0` o vacios.
- estados: `Pendiente`, `Abierto`, `Cerrado`, `Finalizado`.
- participante existente para relaciones y pronosticos.
- polla existente para relaciones y pronosticos.
- partido existente para pronosticos.
- clasificados `local` / `visita`.

El import real usa `upsert` y no borra registros automaticamente.
