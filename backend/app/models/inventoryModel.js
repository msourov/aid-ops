import { broadcastData } from "../index.js";
import { pool } from "../config/dbconfig.js";

export const fetchInventoryData = async ({ limit, offset }) => {
  console.log(limit, offset);
  const [[{ total }]] = await pool.query(
    `SELECT COUNT(*) as total FROM inventory`
  );
  const [inventoryData] = await pool.query(
    "SELECT *, JSON_OBJECT('id', i.purchased_by, 'name', u.name) as purchased_by FROM inventory i LEFT JOIN users u ON i.purchased_by = u.id LIMIT ? OFFSET ?",
    [limit, offset]
  );
  return { inventoryData, total };
};

export const fetchTotalExpense = async () => {
  const [data] = await pool.query(
    "SELECT SUM(cost) as total_cost FROM inventory WHERE item_type = 'expense'"
  );
  return data[0];
};

export const fetchMonthlyExpense = async () => {
  const [data] = await pool.query(
    "SELECT SUM(cost) as total_expense FROM inventory WHERE item_type='expense' AND MONTH(purchased_date) = MONTH(NOW() - INTERVAL 1 MONTH) AND YEAR(purchased_date) = YEAR(NOW())"
  );
  return data[0];
};

export const addToInventoryInDb = async (data) => {
  const { item_name, item_type, quantity, cost, purchased_by } = data;
  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    const [result] = await connection.query(
      "INSERT INTO inventory (item_name, item_type, quantity, cost, purchased_by) VALUES (?, ?, ?, ?, ?)",
      [item_name, item_type, quantity, cost, purchased_by]
    );

    if (item_type === "expense") {
      await connection.query(
        "UPDATE financials SET total_expenses = total_expenses + ?",
        [cost]
      );
      await connection.query("UPDATE financials SET fund = fund - ?", [cost]);
    }
    await connection.commit();
    broadcastData({ action: "NEW_INVENTORY_ITEM", item: data });
    return result;
  } catch (error) {
    console.error(error);
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};
