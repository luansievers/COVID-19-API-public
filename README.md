# Adonis API application

This is the boilerplate for creating an API server in AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

## Setup

Use the adonis command to install the blueprint

```bash
adonis new yardstick --api-only
```

or manually clone the repo and then run `npm install`.


### Migrations

Run the following command to run startup migrations.

```sh
adonis migration:run
```

### Docker

Run:
```sh
docker-compose up -d --build
```
```sh
docker-compose down --rmi all --volumes
```
```sh
docker exec -it covid-api node ace migration:run
```
```sh
docker exec -it covid-api node ace seed --files='QuestionSeeder.js'
```
```sh
docker exec -it covid-api bash
```
