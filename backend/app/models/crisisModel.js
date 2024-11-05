import { pool } from "../config/dbconfig.js";

export const fetchCrises = async ({ limit, offset }) => {
  const [[{ total }]] = await pool.query(
    `SELECT COUNT(*) as total FROM crises`
  );
  const [crises] = await pool.query(
    "SELECT * FROM crises ORDER BY created_at DESC LIMIT ? OFFSET ?",
    [limit, offset]
  );
  return { crises, total };
};

export const fetchCrisisById = async (id) => {
  return pool.query("SELECT * FROM crises WHERE id = ?", [id]);
};

export const fetchCrisisOptions = async () => {
  return pool.query(`SELECT crises.id, crises.title, crises.severity FROM crises
    WHERE status = 'approved' 
    ORDER BY 
    CASE
      WHEN severity = 'high' THEN 1
      WHEN severity = 'medium' THEN 2
      WHEN severity = 'low' THEN 3
      ELSE 4
    END;
       `);
};

export const createCrisisInDB = async (data, userId) => {
  const { title, description, severity, location, status } = data;
  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    const [result] = await connection.query(
      "INSERT INTO crises (title, description, severity, location, status, created_by) VALUES (?, ?, ?, ?, ?, ?)",
      [title, description, severity, location, status, userId]
    );
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

export const approveCrisisInDB = async (crisisId, adminId) => {
  const connection = await pool.getConnection();
  await connection.beginTransaction();
  console.log(crisisId, adminId);
  try {
    const [updateResult] = await connection.query(
      'UPDATE crises SET status = ?, reviewed_by = ? WHERE id = ? AND status = "pending"',
      ["approved", adminId, crisisId]
    );

    if (updateResult.affectedRows === 0) {
      throw new Error("Crisis not found or already approved/rejected");
    }
    const [response] = await connection.query(
      "SELECT crises.*, u1.name as created_by_name, u2.name as reviewed_by_name \
      FROM crises LEFT JOIN users u1 ON crises.created_by = u1.id \
      LEFT JOIN users u2 ON crises.reviewed_by = u2.id \
      WHERE crises.id = ?",
      [crisisId]
    );
    const res = response[0];
    const result = {
      ...res,
      created_by: {
        id: res.created_by,
        name: res.created_by_name,
      },
      updated_by: {
        id: res.reviewed_by,
        name: res.reviewed_by_name,
      },
    };

    delete result.created_by_name;
    delete result.reviewed_by_name;

    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const rejectCrisisInDb = async (crisisId, adminId) => {
  const connection = await pool.getConnection();
  await connection.beginTransaction();
  console.log(crisisId, adminId);
  try {
    const [updateResult] = await connection.query(
      'UPDATE crises SET status = ?, reviewed_by = ? WHERE id = ? AND status = "pending"',
      ["rejected", adminId, crisisId]
    );

    if (updateResult.affectedRows === 0) {
      throw new Error("Crisis not found or already approved/rejected");
    }

    const [response] = await connection.query(
      "SELECT crises.*, u1.name as created_by_name, u2.name as reviewed_by_name \
      FROM crises LEFT JOIN users u1 ON crises.created_by = u1.id \
      LEFT JOIN users u2 ON crises.reviewed_by = u2.id \
      WHERE crises.id = ?",
      [crisisId]
    );

    const res = response[0];
    const result = {
      ...res,
      created_by: {
        id: res.created_by,
        name: res.created_by_name,
      },
      reviewed_by: {
        id: res.reviewed_by,
        name: res.reviewed_by_name,
      },
    };

    delete result.created_by_name;
    delete result.reviewed_by_name;

    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};
