<p align="center">
    <h1> Estudio Ghibli Backoffice</h1>
</p>

Esta es un API construida como proyecto de Platzi Master.

Este proyecto cuenta con:

* Inicio de sesión con facebook y twitter
* Manejo de roles y permisos
* Autenticación de dos factores (2FA)
* CRUD de peliculas, usuarios y roles

## Tech Stack

* NestJS
* Docker
* Postgres
* TypeORM
* Swagger
* NodeJS

## Demo

**Backend documentation:** https://studioghiblibackoffice-backend.herokuapp.com/docs/

**Frontend app:** https://studio-ghibli-backoffice.vercel.app

## Enviroment Variables

Para ejecutar este proyecto es necesario configurar las siguientes variables de entorno:

`BACKOFFICE_CONNECTION`
`BACKOFFICE_HOST`
`BACKOFFICE_USERNAME`
`BACKOFFICE_PASSWORD`
`BACKOFFICE_DATABASE`
`BACKOFFICE_PORT`
`EMAIL_HOST`
`EMAIL_PORT`
`EMAIL_USER`
`EMAIL_PASSWORD`
`ENCRYPTION_KEY`
`HASH_FUNCTION`
`CIPHER_ALGORITM`
`APP_NAME`
`REQUIRED_TWO_FACTOR`
`HEROKU_CONNECTION`
`HEROKU_HOST`
`HEROKU_USERNAME`
`HEROKU_PASSWORD`
`HEROKU_DATABASE`
`HEROKU_PORT`
`TWITTER_CLIENT_ID`
`TWITTER_CLIENT_SECRET`
`TWITTER_CALLBACK_URL`
`FACEBOOK_CLIENT_ID`
`FACEBOOK_CLIENT_SECRET`
`FACEBOOK_CALLBACK_URL`
`FRONTEND_CALLBACK`

## Installation

```bash
$ npm install
```

## Build

```bash
$ npm run build
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

#### Nota: Los test unitarios estan pendientes


```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## License

Este proyecto esta licenciado bajo [MIT licensed](LICENSE).
