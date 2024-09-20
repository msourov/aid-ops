import { pool } from "../config/dbconfig.js";

export const getAllUsers = async () => {
  return pool.query("select * from users");
};

export const getUserById = async (id) => {
  return pool.query("SELECT * FROM users WHERE id = ?", [id]);
};

export const findUserByEmail = async (email) => {
  return pool.query("SELECT * FROM users WHERE email = ?", [email]);
};

export const createUserInDB = async (data) => {
  const { name, email, phone, role, password } = data;
  const volunteer = role
  return pool.query(
    "INSERT INTO users (name, email, phone, role, password) VALUES (?, ?, ?, ?, ?)",
    [name, email, phone, role, password]
  );
};
