import { Pool } from "pg";
import config from ".";
// Database
export const pool = new Pool({
  connectionString: config.CONNECTION_STRING,
});

export const initDb = async () => {
  await pool.query(`
      CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255) UNIQUE NOT NULL,
      password TEXT NOT NULL,
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
