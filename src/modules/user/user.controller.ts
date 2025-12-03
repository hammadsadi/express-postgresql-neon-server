import { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const result = await userService.userCreate(name, email);
    res.status(201).json({
      success: true,
      message: "Created user successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.usersGet();
    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export const userController = {
  createUser,
  getUsers,
};
