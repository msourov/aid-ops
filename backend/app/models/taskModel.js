import { pool } from "../config/dbconfig.js";

export const fetchTasks = async () => {
  return pool.query("SELECT * FROM tasks");
};

export const createTaskInDb = async (taskData) => {
  const { task_description, volunteer_id, crisis_id, adminId } = taskData;
  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    // Check if the crisis is unassigned
    const [crisis] = await connection.query(
      "SELECT * FROM tasks WHERE crisis_id = ?",
      [crisis_id]
    );

    // Check if the volunteer is idle
    const [volunteer] = await connection.query(
      "SELECT * FROM volunteers WHERE user_id = ? AND status = 'idle'",
      [volunteer_id]
    );

    if (crisis.length > 0) {
      throw new Error("Crisis is already assigned to a task.");
    }

    if (volunteer.length === 0) {
      throw new Error("Volunteer is not idle or does not exist.");
    }

    const [result] = await connection.query(
      "INSERT INTO tasks (task_description, volunteer_id, crisis_id, status, created_by) VALUES (?, ?, ?, 'pending', ?)",
      [task_description, volunteer_id, crisis_id, adminId]
    );
    await connection.query(
      "UPDATE volunteers SET assigned_crisis_id = ?, status = 'active' WHERE user_id = ?",
      [crisis_id, volunteer_id]
    );

    await connection.commit();
    return result.insertId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const fetchUserTask = async (id) => {
  return await pool.query("SELECT * FROM tasks WHERE volunteer_id = ?", id);
};

export const updateTaskInDB = async (status, taskId) => {
  return await pool.query("UPDATE tasks SET status = ? WHERE id = ?", [
    status,
    taskId,
  ]);
};
