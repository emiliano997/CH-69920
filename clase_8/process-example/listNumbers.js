const args = process.argv;

process.on("exit", (code) => {
  if (code) {
    return console.log("El proceso ha sido finalizado con el código: ", code);
  }

  console.log("El proceso ha sido finalizado sin problemas");
});

process.on("uncaughtException", (error) => {
  console.log(error);

  switch (error.description) {
    case "empty":
      process.exit(-4);

    case "type error":
      process.exit(-5);

    default:
      process.exit(0);
  }
});

function checkEmpty(numbers) {
  if (numbers.length === 0) {
    throw {
      description: "empty",
    };
  }

  for (const number of numbers) {
    const val = Number(number);
    if (isNaN(val)) {
      throw {
        description: "type error",
        numbers: numbers,
        tipos: numbers.map((n) => (isNaN(n) ? typeof n : "number")),
      };
    }
  }
}

const numbers = args.slice(2);
checkEmpty(numbers);

console.log(numbers);
