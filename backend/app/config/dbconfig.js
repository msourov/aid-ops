import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();
console.log("DB_NAME:", process.env.DB_DATABASE);
export const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
  })
  .promise();

// export const pool = mysql.createPool(process.env.DB_URL);
