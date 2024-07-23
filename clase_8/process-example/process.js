// Obtenemos el directorio actual
// console.log(process.cwd());

// Id del proceso actual
// console.log(`pid: ${process.pid}`);

// Entorno de ejecución
// console.log(process.env);

// Obtenemos argumentos de la línea de comandos
// console.log(process.argv);

// Termina el proceso
// process.exit();

// console.log(process.version);

// -------------------------
//  Trabajando con argumentos
// -------------------------

// const args = process.argv;

// console.log(args.slice(2));

// const PORT = args[3];
// const MODE = args[5];

// console.log(`PORT: ${PORT}`);
// console.log(`MODE: ${MODE}`);

// -------------------------
//  Trabajando con Commander
// -------------------------
import { Command } from "commander";

const program = new Command();

// Seteamos las opciones de nuestro server
program
  .option("-p <number>, --port <number>", "Puerto del servidor", 5000)
  .option("-m <string>, --mode <string>", "Modo del servidor", "development")
  .requiredOption("-d, --debug", "Activar modo debug", false);

program.parse();

console.log("Options: ", program.opts());
console.log("Arguments: ", program.args);
