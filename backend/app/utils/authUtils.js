import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.DB_JWT_SECRET || "your_secret_key";

export const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, secret, {
    expiresIn: "24h",
  });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};
