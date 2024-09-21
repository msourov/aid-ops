import { pool } from "../config/dbconfig.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const fetchTotalDonation = asyncHandler(async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(
      "SELECT SUM(amount) as total FROM donations"
    );
    console.log("rows", rows);
    res.status(200).json({ total: rows[0]?.total || 0 });
  } catch (error) {
    next(error);
  } finally {
    connection.release();
  }
});

export const createDonationInDB = asyncHandler(async (data) => {
  const { donor_name, donor_email, amount } = data;
  if (!donor_name || !donor_email || !amount) {
    return res.status(400).json({ message: "All fields are required. " });
  }

  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    const [result] = await connection.query(
      "INSERT INTO donations (donor_name, donor_email, amount) VALUES (?, ?, ?)",
      [donor_name, donor_email, amount]
    );
    await connection.commit();
    return { id: result.insertId, donor_name, donor_email, amount };
  } catch (error) {
    await connection.rollback();
    next(error);
  } finally {
    connection.release();
  }
});
