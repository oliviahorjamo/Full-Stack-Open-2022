import express from "express";
import { getById, getAll, createNew } from "../controllers/users";

const userRouter = express.Router();

userRouter.post("/", createNew);

userRouter.get("/", getAll);

userRouter.get("/:id", getById);

export default userRouter;
