import express, { NextFunction, Request, Response } from "express";

import config from "./config";
import { initDb, pool } from "./config/db";

const app = express();

initDb();

//  Logger
const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
};

//  Parser
app.use(express.json());
app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello World!");
});

//  Users Routes

app.post("/create-user", async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      `
      INSERT INTO users(name, email) VALUES ($1, $2) RETURNING *
      `,
      [name, email]
    );
    res.status(201).json({
      success: true,
      message: "Created user successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);
    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/users/:id", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [
      req.params.id,
    ]);
    res.status(result.rows.length > 0 ? 200 : 404).json({
      success: result.rows.length > 0 ? true : false,
      message:
        result.rows.length > 0
          ? "User Retrieved Successfully"
          : "User not found",
      data: result.rows?.length > 0 ? result.rows[0] : [],
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

app.patch("/users/:id", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *`,
      [req.body.name, req.body.email, req.params.id]
    );
    res.status(result.rows.length > 0 ? 200 : 404).json({
      success: result.rows.length > 0 ? true : false,
      message:
        result.rows.length > 0 ? "User Updated Successfully" : "User not found",
      data: result.rows?.length > 0 ? result.rows[0] : [],
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`DELETE FROM users WHERE id = $1`, [
      req.params.id,
    ]);
    res.status(result?.rowCount || 0 > 0 ? 200 : 404).json({
      success: result.rows.length > 0 ? true : false,
      message:
        result.rows.length > 0 ? "User Deleted Successfully" : "User not found",
      data: result.rows?.length > 0 ? result.rows[0] : [],
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

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
