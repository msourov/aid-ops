import { pool } from "../config/dbconfig.js";

export const fetchFinancialData = async () => {
  const [data] = await pool.query("SELECT * FROM financials");
  return data[0];
};
