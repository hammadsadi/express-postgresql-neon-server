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

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getSingleUser(Number(req.params.id));
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
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.updateUser(
      Number(req.params.id),
      req.body.name,
      req.body.email
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
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.deleteUser(Number(req.params.id));
    res.status(result?.rowCount || 0 > 0 ? 200 : 404).json({
      success: result.rows.length > 0 ? true : false,
      message:
        result.rows.length > 0 ? "User Deleted Successfully" : "User not found",
      data: result.rows?.length > 0 ? result.rows[0] : [],
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const userController = {
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
