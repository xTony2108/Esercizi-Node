function luckyDraw(player) {
  return new Promise((resolve, reject) => {
    const win = Boolean(Math.round(Math.random()));

    process.nextTick(() => {
      if (win) {
        resolve(`${player} won a prize in the draw!`);
      } else {
        reject(new Error(`${player} lost the draw.`));
      }
    });
  });
}

const getResults = async () => {
  try {
    const result = await luckyDraw("Tina");
    console.log(result);

    const secondResult = await luckyDraw("Jorge");
    console.log(secondResult);

    const lastResult = await luckyDraw("Julien");
    console.log(lastResult);
  } catch (error) {
    console.log(error);
  }
};

getResults();
