FROM postgres

ENV POSTGRES_DB=postgres
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=mypassword

COPY db_backup.sql /docker-entrypoint-initdb.d/

EXPOSE 5432