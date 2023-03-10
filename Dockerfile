FROM library/postgres:15.2-alpine
COPY migrations/001-init-db.sql /docker-entrypoint-initdb.d/
