import {
  createUserInDB,
  findUserByEmail,
  getAllUsers,
  getUserById,
} from "../models/userModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validateUser } from "../validators/userValidator.js";
import { generateToken } from "../utils/authUtils.js";
import bcrypt from "bcrypt";

export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new Error("Email and password are required");
    error.status = 400;
    return next(error);
  }

  console.log(email, password);
  const [user] = await findUserByEmail(email);
  console.log("line 16", user);
  if (user.length === 0) {
    const error = new Error("Invalid email or password");
    error.status = 401;
    return next(error);
  }

  const matchPass = await bcrypt.compare(password, user[0].password);
  if (!matchPass) {
    const error = new Error("Invalid email or password");
    error.status = 401;
    return next(error);
  }
  const token = generateToken(user);
  res.status(200).json({ token });
});

export const getUsers = asyncHandler(async (req, res) => {
  try {
    const [users] = await getAllUsers();
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

export const getUserDetail = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const [user] = await getUserById(id);
  if (!user[0]) {
    const error = new Error("User not found");
    error.status = 404;
    return next(error);
  }
  res.status(200).json(user[0]);
});

export const createUser = asyncHandler(async (req, res, next) => {
  const { name, email, phone, role, password } = req.body;
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const existingUser = await findUserByEmail(email);
  console.log(existingUser, "line 38");
  if (existingUser[0].length) {
    const err = new Error("User already exists");
    err.status = 400;
    return next(err);
  }
  const hashedPass = await bcrypt.hash(password, 10);
  const newUser = await createUserInDB({
    name,
    email,
    phone,
    role,
    password: hashedPass,
  });

  res.status(201).json({ message: "User created successfully", user: newUser });
});
