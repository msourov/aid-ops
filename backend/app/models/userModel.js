import { pool } from "../config/dbconfig.js";

export const fetchUsers = async () => {
  return pool.query("SELECT * FROM users");
};

export const fetchVolunteerInfo = async () => {
  const [rows] = await pool.query(
    "SELECT id, name, role FROM users WHERE role = 'volunteer'"
  );
  console.log(rows);
  return rows.map((volunteer) => ({
    id: volunteer.id,
    name: volunteer.name,
  }));
};

export const fetchAllVolunteers = async () => {
  const [result] = await pool.query(`
    SELECT v.user_id, v.task_count, v.status, u.name, u.email,
           GROUP_CONCAT(t.crisis_id) AS assigned_crisis_id
    FROM volunteers v
    JOIN users u ON v.user_id = u.id
    LEFT JOIN tasks t ON v.user_id = t.volunteer_id
    GROUP BY v.user_id
  `);
  console.log("result", result);
  return result;
};

export const fetchAvailableVolunteer = async () => {
  const [result] = await pool.query(
    `SELECT v.user_id, v.task_count, v.status, u.name, u.email,
           GROUP_CONCAT(t.crisis_id) AS assigned_crisis_id
    FROM volunteers v
    JOIN users u ON v.user_id = u.id
    LEFT JOIN tasks t ON v.user_id = t.volunteer_id
    WHERE v.status = 'idle'
    GROUP BY v.user_id
    `
  );
  return result;
};

export const fetchVolunteerOptions = async () => {
  const [result] = await pool.query(
    `SELECT v.user_id as id, u.name FROM volunteers v 
    LEFT JOIN users u ON u.id = v.user_id 
    WHERE v.status = 'idle'`
  );
  return result;
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

    const [userData] = await connection.query(
      "SELECT id, name, age, email, phone, role FROM users WHERE id = ?",
      [userId]
    );

    await connection.commit();
    return userData[0];
  } catch (error) {
    await connection.rollback();
    console.error("Error occurred, transaction rolled back:", error);
    throw error;
  } finally {
    connection.release();
  }
};
