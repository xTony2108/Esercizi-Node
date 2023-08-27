const fs = require("fs/promises");
const fs2 = require("fs");

/**
 * Con promise
 */

const writeFile = async () => {
  const data = "Questo è il contenuto del file 1";
  try {
    await fs.writeFile("file.txt", data);
    console.log("File creato con successo");
  } catch (error) {
    console.error("Errore: ", error);
  }
};

/**
 * Senza promise
 */

const writeFile2 = () => {
  const data = "Questo è il contenuto del file 2";
  fs2.writeFile("file2.txt", data, (error) => {
    if (error) console.error(error);
    else console.log("File creato con successo");
  });
};

writeFile();
writeFile2();
