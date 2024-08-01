import dotenv from "dotenv";

dotenv.config();

export const config = {
  persistance: process.env.PERSISTANCE,
};
