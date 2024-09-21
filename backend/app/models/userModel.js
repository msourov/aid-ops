import { pool } from "../config/dbconfig.js";

export const fetchUsers = async () => {
  return pool.query("SELECT * FROM users");
};

export const fetchUserById = async (id) => {
  return pool.query("SELECT * FROM users WHERE id = ?", [id]);
};

export const findUserByEmail = async (email) => {
  return pool.query("SELECT * FROM users WHERE email = ?", [email]);
};

export const createUserInDB = async (data) => {
  const { name, age, email, phone, role, password } = data;
  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    const [result] = await connection.query(
      "INSERT INTO users (name, age, email, phone, role, password) VALUES (?, ?, ?, ?, ?, ?)",
      [name, age, email, phone, role, password]
    );
    console.log("result", result);
    const userId = result.insertId;

    await connection.query("INSERT INTO volunteers (user_id) VALUES (?)", [
      userId,
    ]);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    console.error("Error occurred, transaction rolled back:", error);
    throw error;
  } finally {
    connection.release();
  }
};
