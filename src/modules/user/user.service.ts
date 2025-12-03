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

const getSingleUser = async (id: number) => {
  const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return result;
};

const updateUser = async (id: number, name: string, email: string) => {
  const result = await pool.query(
    `UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *`,
    [name, email, id]
  );
  return result;
};

const deleteUser = async (id: number) => {
  const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
  return result;
};

export const userService = {
  userCreate,
  usersGet,
  getSingleUser,
  updateUser,
  deleteUser,
};
