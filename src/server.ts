import express, { Request, Response } from "express";
import { Pool } from "pg";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.join(process.cwd(), ".env") });
const app = express();

// Database
const pool = new Pool({
  connectionString: process.env.CONNECTION_STRING,
});

const initDb = async () => {
  await pool.query(`
      CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255) UNIQUE NOT NULL,
      age INT,
      address TEXT,
      createdAT TIMESTAMP DEFAULT NOW(),
      updatedAT TIMESTAMP DEFAULT NOW()
      )
    `);

  await pool.query(`
      CREATE TABLE IF NOT EXISTS TODOS(
      id SERIAL PRIMARY KEY,
      userId INT REFERENCES users(id),
      title VARCHAR(255),
      description TEXT,
      dueDate DATE, 
      completed BOOLEAN,
      createdAT TIMESTAMP DEFAULT NOW(),
      updatedAT TIMESTAMP DEFAULT NOW()

      )`);
};

initDb();

//  Parser
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.post("/create", (req: Request, res: Response) => {
  console.log(req.body);
  res.status(201).json({
    message: "Created",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
