import {
  createUserInDB,
  fetchAllVolunteers,
  fetchAvailableVolunteer,
  fetchUserById,
  fetchUsers,
  fetchVolunteerInfo,
  findUserByEmail,
} from "../models/userModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { userSchema } from "../validators/userValidator.js";
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
  const token = generateToken(user[0]);
  const { password: _, ...userData } = user[0];
  res.status(200).json({ token, userData });
});

export const getUsers = asyncHandler(async (req, res) => {
  try {
    const [users] = await fetchUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

export const getVolunteerInfo = asyncHandler(async (req, res) => {
  try {
    const volunteers = await fetchVolunteerInfo();
    res.status(200).json(volunteers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching volunteer information", error });
  }
});

export const getAllVolunteers = asyncHandler(async (req, res) => {
  try {
    const volunteers = await fetchAllVolunteers();
    res.status(200).json(volunteers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching volunteers", error });
  }
});

export const getAvailableVolunteers = asyncHandler(async (req, res) => {
  try {
    const volunteers = await fetchAvailableVolunteer();
    res.status(200).json(volunteers);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching available volunteers", error });
  }
});

export const getUserDetail = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const [user] = await fetchUserById(id);
  if (!user[0]) {
    const error = new Error("User not found");
    error.status = 404;
    return next(error);
  }
  res.status(200).json(user[0]);
});

export const createUser = asyncHandler(async (req, res, next) => {
  const { name, age, email, phone, password } = req.body;
  const role = req.body?.role || "volunteer";

  const { error } = userSchema({ name, age, email, phone, role, password });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const existingUser = await findUserByEmail(email);
  if (existingUser[0].length) {
    const err = new Error("User already exists");
    err.status = 400;
    return next(err);
  }
  const hashedPass = await bcrypt.hash(password, 10);
  const newUser = await createUserInDB({
    name,
    age,
    email,
    phone,
    role,
    password: hashedPass,
  });
  const { password: _, ...userData } = newUser;
  res
    .status(201)
    .json({ message: "User created successfully", user: userData });
});
