# ToDo API

## Idea

To enter the Denoland I decided make this project. Simple todo app. And I wanted to use packages/patterns that I have not used before. For this reason there may be things I'm missing or wrong. If you think so, please open issue.

* Typescript
* Layered architecture?
* SOLID principles
* Testing (WIP)

### Packages

* oak: http middleware framework
* awilix: IoC container
* kysely: SQL query builder
* zod: schema validation and static type inference
* rhum: testing

### Missing Features

* [ ] Tests
* [X] Migration tool

This project heavily inspired by [node-service-template](https://github.com/lokalise/node-service-template) project.

## Installation

### Environment Variables

Duplicate .env.defaults and rename as .env to set up your configuration.

### Setting Up The Database

Create a postgresql database for this project.

```bash
$ docker run -e POSTGRES_PASSWORD=123456 -d -p 5432:5432 --name db_todo_app library/postgres:15.2-alpine
$ docker exec -it db_todo_app psql -U postgres
> CREATE DATABASE todo_app_db;
```

### Startup

Populate the database with kysely migrator. Then start server.

```bash
$ deno task migration
$ deno task dev
```
