import app from "../src/app";
import supertest from "supertest";

const api = supertest(app);

test("the route is found", async () => {
  await api.get("/api/publications/").expect(200);
});

// here close connection to the database
