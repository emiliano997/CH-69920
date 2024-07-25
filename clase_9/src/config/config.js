import dotenv from "dotenv";
import { Command } from "commander";

const program = new Command();

program.option("-e, --env <string>", "Modo del servidor", "dev");

program.parse();

const environment = program.opts().env;

dotenv.config({
  path: `.${environment}.env`,
});

console.log(process.env.MONGO_URI);

export const config = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT,
  PERSISTANCE: process.env.PERSISTANCE,
};
