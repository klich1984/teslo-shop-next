# Description

```
npx @next/codemod@canary next-async-request-api
```

Crear tsconfig para el seed

1. Entrar a la carpeta `src/seed/`
2. correr comando `npx tsc --init`

## Correr en dev

1. Clonar el repositorio.
2. Crear una copia del `.env.template` y renombrarlo a `.env` y cambiar las variables de entorno.
3. Instalar dependencias `npm i`
4. Levantar la base de datos `docker compose up -d`
5. Correr las migraciones de prisma `npx prisma migrate dev`
6. Ejecutar seed `npm run seed`
7. Correr el proyecto `npm run dev`

## Correr en producción
