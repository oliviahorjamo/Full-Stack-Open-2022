import sequelizeConnection from "./config";
import User from "./models/user";
import Publication from "./models/publication";
import logger from "../utils/logger";
import { users } from "../seeders/users";
import { publications } from "../seeders/publications";

const initDb = async (): Promise<void> => {
  try {
    await syncTables();
    await createUsers();
    await createPublications();
  } catch (error) {
    throw new Error("something went wrong with initializing db");
  }
};

const syncTables = async () => {
  try {
    await sequelizeConnection.sync({ alter: true });
  } catch (error) {
    logger.error("something went wrong with syncing the db");
  }
};

const createUsers = async () => {
  console.log("starting to create users");
  try {
    for (const user of users) {
      console.log("user", user);
      await User.findOrCreate({
        where: {
          username: user.username,
        },
        defaults: {
          name: user.name,
          password: user.password,
          id: user.id,
          username: user.username,
        },
      });
      logger.info("created initial users");
    }
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);
    }
    logger.error("something went wrong with creating users");
  }
};

const createPublications = async () => {
  try {
    await Promise.all(
      publications.map(async (publication) => {
        await Publication.create(publication);
      })
    );
    logger.info("created initial publications");
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);
    }
    logger.error("something went wrong with creating publications");
  }
};

export default initDb;
