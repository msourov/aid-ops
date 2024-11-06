import { pool } from "../config/dbconfig.js";
import { broadcastData } from "../index.js";

export const fetchAllDonations = async ({ limit, offset }) => {
  const [[{ total }]] = await pool.query(
    `SELECT COUNT(*) as total FROM donations`
  );
  console.log(total);

  const [donations] = await pool.query(
    "SELECT * FROM donations LIMIT ? OFFSET ?",
    [limit, offset]
  );
  return { donations, total };
};

export const fetchTotalDonation = async () => {
  const [data] = await pool.query("SELECT SUM(amount) as total FROM donations");
  return data[0];
};

export const fetchMonthlyDonation = async () => {
  const [data] = await pool.query(
    "SELECT sum(amount) as total_donation FROM donations WHERE MONTH(donation_date) = MONTH(NOW() - INTERVAL 1 MONTH) AND YEAR(donation_date) = YEAR(NOW())"
  );
  return data[0];
};

export const createDonationInDB = async (data) => {
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

    await connection.query(
      "UPDATE financials SET fund = fund + ?, total_donation = total_donation + ?",
      [amount, amount]
    );

    await connection.commit();

    broadcastData({
      action: "NEW_DONATION",
      donation: { id: result.insertId, donor_name, donor_email, amount },
    });

    return { id: result.insertId, donor_name, donor_email, amount };
  } catch (error) {
    await connection.rollback();
    next(error);
  } finally {
    connection.release();
  }
};
