import dotenv from "dotenv";
import { Command } from "commander";

const program = new Command();

program.option("-e, --env <string>", "Modo del servidor", "development");

program.parse();

console.log("Options: ", program.opts());

const environment = program.opts().env;

dotenv.config({
  path: `.${environment}.env`,
});

console.log(process.env.PORT);
console.log(process.env.ENVIRONMENT);
console.log(process.env.MONGO_URI);

export const config = {
  PORT: process.env.PORT,
  ENVIRONMENT: process.env.ENVIRONMENT,
  MONGO_URI: process.env.MONGO_URI,
};
