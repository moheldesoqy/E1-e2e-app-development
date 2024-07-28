## Exercise description - First exercise

- Includes two folders, one for the back-end, and another for a simple CRUD portal to interact with the APIs
- Utilized MongoDB as the NoSQL Database for the exercise, with the public Database URL accessible from the environment file
- Utilized Prisma's ORM to connect to my MongoDB database and define the schema for the CRUD operations
- Runnable using docker-compose up by building the docker-compose.yml
- Extra: Runnable also by building the docker image and running the container from the Dockerfile provided
- Extra: Added swagger documentation accessible at store/products/swagger

Note: the portal will be accessible at port 8080, whereas the back-end APIs can be accessed via 8081 at store/products incase of postman API testing

## Libraries/technologies used

1. Node.JS/Nest.JS
2. MongoDB
3. Prisma ORM
4. Rest file "http-products.rest" using VSCode extension "REST Client" to run the endpoints from within the project directory
5. Next.JS for a super simple CRUD front-end portal to Create, Read, Update & Delete

## Running the app

```bash

$ docker-compose up
