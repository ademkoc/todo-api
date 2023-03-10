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
* [ ] Migration tool

This project heavily inspired by [node-service-template](https://github.com/lokalise/node-service-template) project.

## Installation

```bash
$ docker build . -t todo_app_db
$ docker run --name db_todo_app -e POSTGRES_PASSWORD=123456 -d -p 5432:5432 todo_app_db
$ deno task dev
```
