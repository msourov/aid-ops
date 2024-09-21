import { broadcastData } from "..";
import { pool } from "../config/dbconfig";
import { asyncHandler } from "../utils/asyncHandler";

export const fetchInventoryData = async () => {
  return pool.query("SELECT * FROM inventory");
};

export const fetchTotalCost = async () => {
  return pool.query(
    "SELECT SUM(COST) as total_cost FROM inventory WHERE item_type = expense"
  );
};

export const addToInventoryInDb = async (data) => {
  const { item_name, item_type, quantity, cost, purchased_by } = data;
  const connection = await pool.getConnection();
  await pool.beginTransaction();

  try {
    const [result] = connection.query(
      "INSERT INTO inventory (item_name, item_type, quantity, cost, purchased_by) VALUES (?, ?, ?, ?, ?)",
      [item_name, item_type, quantity, cost, purchased_by]
    );
    console.log("add inventory result", result);
    await connection.commit();
    broadcastData({ action: "NEW_INVENTORY_ITEM", item: data });
    return result;
  } catch (error) {
    console.error(error);
    await connection.rollback();
  } finally {
    connection.release();
  }
};
