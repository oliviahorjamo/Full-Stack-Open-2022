import app from "./app";
import http from 'http';
import logger from "./utils/logger";
import initDb from "./db/init";

const port = process.env.PORT || 3001;

const server = http.createServer(app);

initDb()
  .then(() => {
    server.listen({ port: port}, () => {
      logger.info(`Server running on port ${port}`);
    });
  }).catch(() => {
    logger.info('something went wrong with initializing the db');
  });