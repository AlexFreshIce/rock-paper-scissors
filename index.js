const readline = require("readline");
const { getHMAC } = require("./hmac");
const { getGameMenuMes } = require("./menu");
const { getResultMes } = require("./result");
const { getRulesMes, explMess } = require("./rules");
const { pasreAnswer } = require("./pasreAnswer");
const { argsErrorMes, argsExampleMes, moveErrorMes } = require("./errorMes");

const moves = Array.from(new Set(process.argv.slice(2)));
const movesLen = moves.length;
const isValidArgs = moves && movesLen % 2 !== 0;
let gameCounter = 1;

const rl = readline.promises.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function game() {
  console.log("\x1b[35m%s\x1b[0m", `Game ${gameCounter}`);
  const randomIndex = Math.floor(Math.random() * movesLen);
  const pcMove = moves[randomIndex];
  const { HMAC, secret } = getHMAC(pcMove);
  console.log("\x1b[36m%s\x1b[0m", `HMAC: ${HMAC}`);
  console.log("\x1b[32m%s\x1b[0m", getGameMenuMes(moves));

  async function userAnswer() {
    let answer = await rl.question("Enter your move: ");

    const isAnswerExit = answer === "0" || answer === "exit";
    const isAnswerHelp = answer === "?" || answer === "help";
    const isAnswerMove =
      (answer > 0 && answer <= movesLen) || moves.includes(answer);

    if (isAnswerExit) {
      process.exit();
    } else if (isAnswerHelp) {
      console.log("\x1b[33m%s\x1b[0m", explMess);
      console.table(getRulesMes(moves, movesLen));
      userAnswer();
    } else if (isAnswerMove) {
      let userMove = pasreAnswer(answer, moves, movesLen);
      console.log(`Your move: ${userMove}`);
      console.log(`Computer move: ${pcMove}`);
      console.log(
        "\x1b[35m%s\x1b[0m",
        getResultMes(pcMove, userMove, moves, movesLen)
      );
      console.log("\x1b[36m%s\x1b[0m", `HMAC key: ${secret}\n`);
      gameCounter++;
      game();
    } else {
      console.error("\x1b[31m%s\x1b[0m", moveErrorMes);
      userAnswer();
    }
  }
  await userAnswer();
}

if (isValidArgs) {
  game();
} else {
  console.error("\x1b[31m%s\x1b[0m", argsErrorMes);
  console.log("\x1b[33m%s\x1b[0m", argsExampleMes);
  process.exit();
}
