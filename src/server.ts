import express, { NextFunction, Request, Response } from "express";

import config from "./config";
import { initDb } from "./config/db";
import logger from "./middlewares/logger";
import { UserRoutes } from "./modules/user/user.route";

const app = express();

initDb();

//  Parser
app.use(express.json());
app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello World!");
});

//  Users Routes
app.use("/user", UserRoutes);

// Api Not Found
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API not found",
  });
});

app.listen(config.PORT, () => {
  console.log(`Example app listening on port ${config.PORT}`);
});
