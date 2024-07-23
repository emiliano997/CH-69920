// -------------------------
//  Trabajando con listeners de process
// -------------------------

process.on("uncaughtException", (error) => {
  console.log("Error no controlado: ", error);
});

process.on("message", (message) => {
  console.log("Mensaje recibido: ", message);
});

process.on("exit", (code) => {
  if (code) {
    return console.log("El proceso ha sido finalizado con el código: ", code);
  }

  console.log("El proceso ha sido finalizado sin problemas");
});

// console();
