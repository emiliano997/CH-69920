import dotenv from "dotenv";

dotenv.config();

console.log(isNaN(process.env.PORT) ? 5000 : process.env.PORT);
console.log(process.env.ENVIRONMENT);
console.log(process.env.MONGO_URI);

// export default {
//   PORT: isNaN(process.env.PORT) ? 5000 : process.env.PORT,
//   ENVIRONMENT: process.env.ENVIRONMENT,
//   MONGO_URI: process.env.MONGO_URI,
// };

export const config = {
  PORT: isNaN(process.env.PORT) ? 5000 : process.env.PORT,
  ENVIRONMENT: process.env.ENVIRONMENT || "development",
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/test",
};
