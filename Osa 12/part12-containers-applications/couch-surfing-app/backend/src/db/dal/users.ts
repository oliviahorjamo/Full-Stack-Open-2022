import User, { UserAttributes } from "../models/user";

export const getById = async (id: string): Promise<UserAttributes> => {
  const user = await User.findByPk(id);
  if (!user) {
    // @todo throw custom error
    throw new Error("user not found");
  }
  return user;
};

export const getAll = async (): Promise<UserAttributes[]> => {
  const users = await User.findAll({ where: {} });
  if (!users) {
    throw new Error("users not found");
  }
  return users;
};

export const createNew = async (
  user: UserAttributes
): Promise<UserAttributes> => {
  const userCreated = await User.create(user);
  if (!userCreated) {
    throw new Error("something went wrong with user creation");
  }
  return userCreated;
};
