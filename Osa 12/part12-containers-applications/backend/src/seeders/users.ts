import { v4 as uuidv4 } from "uuid";

export const users = [
  {
    id: uuidv4(),
    name: "Test User",
    username: "testuser999",
    password: "secret",
  },
  {
    id: uuidv4(),
    name: "Second Test User",
    username: "testuser2",
    password: "secret",
  },
];
