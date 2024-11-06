import { pool } from "../config/dbconfig.js";

export const fetchTasks = async ({ limit, offset }) => {
  const [[{ total }]] = await pool.query(
    `SELECT COUNT(*) as total from tasks;`
  );
  const [tasks] = await pool.query(
    `SELECT t.*, JSON_OBJECT('id', volunteer_user.id, 'name', volunteer_user.name) as volunteer, 
    JSON_OBJECT('id', c.id, 'name', c.title) AS crisis, 
    JSON_OBJECT('id', u.id, 'name', u.name) as created_by 
    FROM tasks t JOIN users u ON t.created_by = u.id
    JOIN crises c on t.crisis_id = c.id
    JOIN volunteers v ON t.volunteer_id = v.user_id
    JOIN users volunteer_user on v.user_id = volunteer_user.id
    LIMIT ? OFFSET ?
    `,
    [limit, offset]
  );
  return { tasks, total };
};

export const createTaskInDb = async (taskData) => {
  const { task_description, volunteer_id, crisis_id, adminId } = taskData;
  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    // // Check if the crisis is unassigned
    // const [crisis] = await connection.query(
    //   "SELECT * FROM tasks WHERE crisis_id = ?",
    //   [crisis_id]
    // );

    // Check if the volunteer is idle
    const [volunteer] = await connection.query(
      "SELECT * FROM volunteers WHERE user_id = ? AND status = 'idle'",
      [volunteer_id]
    );

    // if (crisis.length > 0) {
    //   throw new Error("Crisis is already assigned to a task.");
    // }

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
