const getResult = (pcMove, userMove, moves, movesLen) => {
  const pcMoveIndex = moves.indexOf(pcMove);
  const userMoveIndex = moves.indexOf(userMove);
  const half = (movesLen - 1) / 2;
  if (pcMoveIndex === userMoveIndex) return "draw";
  if (
    (userMoveIndex > pcMoveIndex && userMoveIndex > pcMoveIndex + half) ||
    (userMoveIndex < pcMoveIndex && userMoveIndex + half >= pcMoveIndex)
  ) {
    return "win";
  }
  return "lose";
};

const resoultMes = {
  win: "You win!",
  lose: "Computer win!",
  draw: "Draw!",
};

const getResultMes = (pcMove, userMove, moves, movesLen) => {
  const resoult = getResult(pcMove, userMove, moves, movesLen);
  return resoultMes[resoult];
};

module.exports = { getResult, getResultMes };