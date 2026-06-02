# CSV de migracion

Coloca aqui los CSV exportados desde Google Sheets para ejecutar el importador.

Nombres esperados:

- `participantes.csv`
- `pollas.csv`
- `participantes_pollas.csv`
- `partidos.csv`
- `llaves.csv`
- `pronosticos.csv`
- `pronosticos_eliminacion.csv`

Estos archivos pueden contener datos sensibles. No deben subirse a GitHub.

El importador puede ejecutarse primero en modo dry-run:

```bash
npm run importar:dry
```

Y luego en modo real:

```bash
npm run importar
```
