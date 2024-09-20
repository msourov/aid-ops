import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.JWT_SECRET || "your_secret_key"; // Ensure this is in your .env file

export const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, secret, {
    expiresIn: "24h",
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, secret);
};
