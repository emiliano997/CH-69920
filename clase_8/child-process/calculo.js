export const calculo = () => {
  let sum = 0;
  for (let i = 0; i < 6e9; i++) {
    sum += i;
  }
  return sum;
};

process.on("exit", (code) => {
  console.log(`El worker #${process.pid} finalizó con el código: ${code}`);
});

process.on("message", async (message) => {
  // console.log(`El worker #${process.pid} inició con el mensaje: ${message}`);

  // const sum = calculo();

  // process.send(sum);

  // process.exit();

  setTimeout(async () => {
    const data = await fetch("https://jsonplaceholder.typicode.com/todos");

    const todos = await data.json();

    process.send(todos.length);
  }, 5000);
});
