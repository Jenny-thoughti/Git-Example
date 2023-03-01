# GIT Tutorial

## Install npm packages

```sh
npm i
# or
npm install
# or
yarn
```

## Setup database & run migration

### Delete exiting database & create a fresh one

```sh
npm run migrate:reset-db
# or
yarn migrate:reset-db
```

### Run migration & seeder

```sh
npm run migrate:dus
# or
yarn migrate:dus
```

## Run application

### In development / testing mode

```sh
npm run dev
# or
yarn dev
```

### In staging / production mode

```sh
npm start
# or
yarn start
```
