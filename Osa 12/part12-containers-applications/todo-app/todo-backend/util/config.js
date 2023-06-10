require('dotenv').config()
// note that these should not be locally as these are
// the urls required by docker
// however, for some reason setting the env variables in .env
// and dev.Dockerfile don't work
const MONGO_URL = 'mongodb://the_username:the_password@mongo:27017/the_database'
const REDIS_URL = 'redis://redis:6379'

module.exports = {
  MONGO_URL,//: process.env.MONGO_URL,//: 'mongodb://the_username:the_password@localhost:3456/the_database',
  REDIS_URL//: process.env.REDIS_URL//: '//localhost:6378'
}

// enable the development of the todo app backend while it's running inside a container
// after this you want start the app with npm run dev while having the container run
// but just by running docker run -p ports...

// create a dev dockerfile where you put the commands for starting the app in dev mode
// namely the commands needed are npm install and npm run dev (to run using nodemon)

// create docker-compose.yml where you put all information related to how to run
// the app in dev mode in docker --> after this docker compose up should run the app in dev mode
// note that this means that docker compose up no longer automatically uses the prod
// development file but that should be specified separately

// issues: how to set up mongodb and redis urls

// CURRENT SITUATION
// Get the server running locally by running docker compose -f docker-compose.dev.yml up
// This gets mongodb and redis services running
// Then run npm run dev locally
// Now you have been able to create an image for the dev environment
// now you need to use the image to get the app up when running docker compose -f docker-compose.dev.yml up
// currently the connection to redis doesn't work.
// The container is running but the app inside it doesn't work
// However, the services do work normally as running docker exec -it todo-backend-mongo works normally
// such as the same with docker.
// This means that the issue is in how the app tries to connect to redis.
// Now the app no longer crashes and it finds the number of todos correctly.
// However, localhost:3001 doesn't have the app running.
// The next goal is to find out why

// Also write to Jira how you fixed the connections.

// GOAL
// Set a service todo-backend in docker which accesses the mongodb and redis services
// This service should then be run somehow by running docker compose up
// Currently this service keeps crashing while mongodb and redis work fine

// for some reason connection to the mongodb works even with the firewall
// when run on docker

