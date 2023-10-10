const { getResult } = require("./result");

const getRulesMes = (moves, movesLen) => {
  const table = {};
  for (let row of moves) {
    table[`PC: ${row}`] = {};
    for (let coll of moves) {
      table[`PC: ${row}`][`User: ${coll}`] = getResult(
        coll,
        row,
        moves,
        movesLen
      );
    }
  }
  return table;
};

const explMess = "Explanatory note: The result in the table is indicated from the user's perspective."

module.exports = { getRulesMes, explMess };
