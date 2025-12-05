<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. clonar el repositorio
2. Ejecutar
```
yarn install
```
3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```
4. Levantar la base de datos
```
docker-compose up -d
```
5. Clonar el archivo __.ev.template__ y renombrar la copia a __.env__.
6. LLenmar las variables de entorno definidad en el __.env__.
7. Ejecutar la aplicación en dev:
```
npm run start:dev
```
6. Reconstruir la base de datos con la smeilla
```
localhost:3100/api/seed
```
## Stack usado
* MongoDB
* NestJs

# Production Build
1. Crear el archivo ```.env.prod```
2. Llenar las variables de entorno en prod
3. Crear la nueva imagen
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

