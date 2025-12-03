import { pool } from "../../config/db";

const userCreate = async (name: string, email: string) => {
  const result = await pool.query(
    `
      INSERT INTO users(name, email) VALUES ($1, $2) RETURNING *
      `,
    [name, email]
  );
  return result;
};

const usersGet = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};
export const userService = {
  userCreate,
  usersGet,
};
