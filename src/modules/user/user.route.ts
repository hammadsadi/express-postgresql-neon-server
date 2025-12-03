import { Router } from "express";
import { userController } from "./user.controller";

const route = Router();

route.post("/", userController.createUser);
route.get("/", userController.getUsers);

export const UserRoutes = route;
