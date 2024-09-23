import { pool } from "../config/dbconfig.js";
import { broadcastData } from "../index.js";

export const fetchAllDonations = async () => {
  const [donations] = await pool.query("SELECT * FROM donations");
  return donations;
};

export const fetchTotalDonation = async () => {
  const [data] = await pool.query("SELECT SUM(amount) as total FROM donations");
  return data[0];
};

export const fetchDailyDonation = async () => {
  const [data] = await pool.query(
    "SELECT sum(amount) as today_donation FROM donations WHERE DATE(donation_date)=CURDATE()"
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
