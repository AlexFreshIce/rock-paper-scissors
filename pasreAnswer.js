const pasreAnswer = (answer, moves, movesLen) => {
  if (!Number.isNaN(answer) && +answer > 0 && answer <= movesLen) {
    return moves[+answer - 1];
  } else if (moves.some((el) => el === answer)) {
    return answer;
  } else return "";
};
module.exports={pasreAnswer}