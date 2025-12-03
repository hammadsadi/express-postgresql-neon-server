import { Router } from "express";
import { userController } from "./user.controller";

const route = Router();

route.post("/", userController.createUser);
route.get("/", userController.getUsers);
route.get("/:id", userController.getSingleUser);
route.patch("/:id", userController.updateUser);

export const UserRoutes = route;
