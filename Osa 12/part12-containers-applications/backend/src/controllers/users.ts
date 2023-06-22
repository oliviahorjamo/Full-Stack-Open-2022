import { Request, RequestHandler, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { UserAttributes } from "../db/models/user";
import toNewUserEntry from "../utils/mappers/users";
import { parseUuid } from "../utils/mappers/users";
import * as userDal from "../db/dal/users";

export const getById: RequestHandler = (req: Request, res: Response): void => {
  const id = parseUuid(req.params.id);
  userDal
    .getById(id)
    .then((record) => {
      return res.json(record);
    })
    .catch((e) => {
      return res.json(e);
    });
};

export const createNew: RequestHandler = (
  req: Request,
  res: Response
): void => {
  const id = uuidv4();
  const userToCreate: UserAttributes = toNewUserEntry({ ...req.body, id });
  userDal
    .createNew(userToCreate)
    .then((record) => {
      return res.json(record);
    })
    .catch((e) => {
      return res.json(e);
    });
};

export const getAll: RequestHandler = (_req: Request, res: Response): void => {
  userDal
    .getAll()
    .then((records) => {
      return res.json(records);
    })
    .catch((e) => {
      return res.json(e);
    });
};
