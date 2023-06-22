// Here all information related to mapping data to types
import { UserAttributes } from "../../db/models/user";
import { isString, isUuidString } from ".";

const toNewUserEntry = (object: unknown): UserAttributes => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data for user");
  }

  if (
    "name" in object &&
    "username" in object &&
    "password" in object &&
    "id" in object
  ) {
    const newEntry = {
      name: parseName(object.name),
      username: parseUserName(object.username),
      password: parsePassword(object.password),
      id: parseUuid(object.id),
    };
    return newEntry;
  }
  throw new Error("Incorrect data for user: somefields are missing");
};

const parseUserName = (username: unknown): string => {
  if (!username || !isString(username)) {
    throw new Error("Incorrct or missing username");
  }
  return username;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};

const parsePassword = (password: unknown): string => {
  if (!password || !isString(password)) {
    throw new Error("Incorrect or missing password");
  }
  return password;
};

export const parseUuid = (id: unknown): string => {
  if (!id || !isString(id) || !isUuidString(id)) {
    throw new Error("id given not uuid v4");
  }
  return id;
};

export default toNewUserEntry;
