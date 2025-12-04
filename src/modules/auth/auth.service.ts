import bcrypt from "bcryptjs";
import { pool } from "../../config/db";
import jwt from "jsonwebtoken";
const loginUser = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  if (result.rows?.length === 0) {
    throw new Error("User not found");
  }
  const user = result.rows[0];
  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    throw new Error("Invalid password");
  }
  const secret = "sdfsdf4t35t45";
  const token = jwt.sign({ id: user.id, email: user.email }, secret, {
    expiresIn: "7d",
  });

  return {
    user,
    token,
  };
};

export const authService = {
  loginUser,
};
