# Backend Country API

1.  This project includes API endpoints that return required data about the conutries.
2.  Each endpoint is secured with middleware auth.js such that endpoints are accessible only for authorised user.
3.  Secret details like SECRET_KEY are not kept secret for testing purpose.
4.  Request.rest file is used as postman for checking endpoints.

## Tech stack used

    NodeJs
    ExpressJs

## Registration

POST http://localhost:3000/user/register

1. Register a user with datails {\_id , name , passsword}.
2. Datails of a user are stored in CODE ITSELF in User variable.
3. Token is generated which is used for authorization.
4. Authorisation is checked for every endpoint in the application.

## Functionalities and API Endpoints

GET http://localhost:3000/Allcountries => Return data of all countries fetched from the given link in paginated form.

GET http://localhost:3000/ => Return data of all countries fetched from the given link in paginated form.

GET http://localhost:3000/Allcountries/{name} => Return data of specific conutry.(Eg :- http://localhost:3000/Allcountries/Russia)

GET http://localhost:3000/countries?sort=desc&basis=area&language=eng => Return countries Name as per your requirements.

It has { populationMin,
populationMax,
areaMin,
areaMax,
language,
sort,
basis,} parameters.

Customize as per your requirements

## Run locally

cd backend

npm start

service is live by default on PORT 3000.

## How to Use

1.  Go to request.rest file
2.  Register a user with details as per your choice.
3.  A token will be generated for the register user.
4.  Put this token at {replace with token generated} at every request.
5.  Now you can use any of the given service with the Authorised token.
