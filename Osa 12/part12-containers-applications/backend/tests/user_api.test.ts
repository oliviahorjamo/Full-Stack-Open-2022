import app from "../src/app";
import supertest from "supertest";
import User from "../src/models_original/user";
import db from "../src/db/config";
const { sequelize } = db;

// How to write tests with typescript?
// Should the tests be written in typescript or javascript?
// The types should be correct just by accessing the database only through
// routes

const api = supertest(app);

const inititalUsers = [
  {
    name: "Tester",
    username: "testuser",
    password: "secret",
  },
];

beforeEach(async () => {
  await User.destroy({
    where: {},
    truncate: true,
    cascade: true,
  });
  const userObject = User.build(inititalUsers[0]);
  await userObject.save();
});

test("user route returns a list of users", async () => {
  const response = await api.get("/api/users/");
  const usernames = response.body.map((u) => u.username);
  expect(usernames).toContain("testuser");
});

afterAll(async () => {
  await sequelize.close();
});
