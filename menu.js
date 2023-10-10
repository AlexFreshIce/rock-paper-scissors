const getGameMenuMes = (moves) => {
  let message = `Available moves: \n`;
  moves.forEach((el, i) => {
    message += `${i + 1} - ${el}\n`;
  });
  message += `0 - exit\n? - help`;
  return message;
};
module.exports={getGameMenuMes}