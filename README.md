# NODE WISHLIST REST API

## Description
This is a REST API to register users and their favorite products.

## Stacks/Dependencies
This app uses `Docker` to build and `Postgres` Database image.
* docker
* postgres
* jest
* yarn v1.22.5
* node v15.14.0

### Installing dependencies/Configurations
In the root directory of the app, run this command:

```bash
yarn install
```
or just:
```bash
yarn
```

then run commands to start docker and configure database:

To start docker database images run:
```bash
yarn docker:up 
```
and then run migrations:
```bash
yarn migrate
```
so dev environment is ready to start!

## Running app
In the root project run:
```bash
yarn start
```
This command run server in [localhost on the port 3000](http://localhost:3000/api).

## Testing code

To run tests run the following commands:
```bash
yarn docker:test:up
```
this command updates docker instance with database for tests

and this command create test database:
```bash
yarn db:create:test
```
and to run migrations:
```bash
yarn migrate:test
```
and finally run:
```bash
yarn test
```
to start testing!

Also if you want to se app coverage, run: 
```bash
yarn test:c
```

PS: this test generate a directory named `coverage` on the root of the project. You can check a more detailed status of the code coverage on `coverave/lcov-report/index.html`.

> After that you can simply run `yarn start` or `yarn test`, so you don't need to re-run config commands again.

## Endpoints

```
GET /api/users
GET /api/users/<id>
POST /api/users
PUT /api/users/<id>
DELETE /api/users/<id>

GET /api/products
GET /api/products/<id>
POST /api/products

POST /api/auth/login
```

## USERS
### GET /api/users
return all users, needs authentication.
headers: { 'x-access-token': <token>}

### GET /api/users/<id>
return user by id, needs authentication.
headers: { 'x-access-token': <token>}

### POST /api/users
create new user, don't need authentication.
body: {
  name: required,
  email: required,
  password: required
}

### PUT /api/users/<id>
update user, have to be authentication.
headers: { 'x-access-token': <token>}
body: {
  name: required,
  email: required,
  password: required
}

### DELETE /api/users/<id>
delete user by id, have to be authentication.
headers: { 'x-access-token': <token>}

## PRODUCTS
### GET /api/products
get all products, needs authentication.
headers: { 'x-access-token': <token>}
query: { page: <number> }

example: /api/products?page=1

### GET /api/products/<id>
get product by id, needs authentication.
headers: { 'x-access-token': <token>}

### POST /api/products
favorite product, needs authentication.
headers: { 'x-access-token': <token>}
body: {
  userId: required,
  sku: required,
}

## AUTH
### POST /api/auth/login
return access token to include on private endpoints, don't need authentication.
body: {
  email: required,
  password: required
}

## Usage
First of all create a user on route POST /api/users so you can authenticate using the email and password on POST /api/auth/login.
After this, you should get product list on GET /api/products and get the id of this product, then on the POST /api/products you should pass your userId and the id of the product as a sku code to favorite this product. 

## Code Architecture

It contains code architecture commonly used by the community, with some modifications:

* `src/app` : app module containing the API.
  * `controllers`: controller module containing all controllers
  * `middlewares`: middlewares module that includes auth middleware.
  * `models`: models module containing sequelize modules and init models.
  * `policies`: this module includes favorite product logic (business rules).
  * `repository`: module layer that comunicates with database.
  * `routes`: module to register all app routes.
  * `services`: module layer that contains API calls.
  * `utils`: module that contains helpers/validations, etc.
* `src/config` : here are centralized the API config, database, etc.
* `src/database` : module that start database and store migrations.

### StyleGuide

This project uses [AirBnb StyleGuide](https://github.com/airbnb/javascript/tree/master/react) with some modifications in the rules:
```js
...,
rules: {
    'arrow-parens': ['error', 'as-needed'],
},
...
```