# Unity Prototype
###### By Guilherme Salim.
## Getting Started
### Requirements:
The project requires:
* [Node.js](https://nodejs.org/en/download/) - a javascript runtime built using Chrome's V8 Javascript Engine. You can check if you have Node.js using the following command on your terminal or download it using the previous link:
```sh
node -v
```
* [Docker](https://docs.docker.com/get-docker/) - you will require docker to run Docker-Compose.

### Installing - Let's run it
You should download, install and run locally this repo using the following commands:

```sh
git clone https://github.com/guisalim/prototype.git
cd prototype/compose
```
Since we use our `docker-compose` process, it is not required to start the project alone. Docker Compose will start it for you and you can check it on `https://localhost:8080`
So, to run a **production** build, you just need to run: 
```sh
docker-compose up --profile production up --build
```
However, to run a **development** build, you just need to run: 
```sh
docker-compose up --profile dev up --build
```

The Unity Application was not included on the Docker-Compose, so you'll have to run it locally.
Make sure that you have Unity version *2020.3.6f1* installed.

### Code Structure

* client - React application
* compose - Docker Compose configuration
* gateway - Entry point for the server.
* server - Responsible for managing our data. It is divided in 4 main levels:
  * Contollers: responsible for manage the APIs
  * Busiiness Logic: Also known as services, are responsible for apply and/or manage busines logic for the data managed
  * Data Layer: Group of function responsible for communicate with the database and ensure consistent operations.
  * Database Schemas: group of schemas used by the MongoDB database
* unity - Unity application. It is not included in our Docker-Compose
