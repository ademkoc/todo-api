# todo-api

```bash
docker build . -t todo_app_db
```

```bash
docker run --name db_todo_app -e POSTGRES_PASSWORD=123456 -d -p 5432:5432 todo_app_db
```
