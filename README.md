# Search Orders

## frontend

```
cd frontend
npm i
npm start
```

## start backend

```
cd backend/api
npm run dev
```

## Start db

```
cd backend/db
make docker_up
```

## Seed data

Running the seed script will insert data into the database. Note: The seed script is not idempotent, meaning each run will add duplicate rows to the table.
To ensure idempotency, clear the table before each run.

```
cd backend/api/src
ts-node seed.ts
```

## Decisions

- BE is NestJS/Node.js
- Postgresql is used for db running in docker
- TypeORM is used to object relational mapping and migrations
- FE is built in React

## TODO

- the data is stop informstion... can be used to draw a route on the map with proper sequence
