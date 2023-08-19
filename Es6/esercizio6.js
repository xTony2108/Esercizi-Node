const figlet = require("figlet");

figlet("Esercizio 6 completato!", (error, data) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log(data);
});
