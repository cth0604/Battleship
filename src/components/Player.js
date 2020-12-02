const Player = (oppBoard, isAI = false) => {
  const randomCoordinate = () => {
    return {
      x: Math.floor(Math.random() * 10),
      y: Math.floor(Math.random() * 10),
    };
  };

  const attack = (coordinate) => {
    const squareState = oppBoard.getBoard()[coordinate.y][coordinate.x];
    if (!squareState) {
      oppBoard.receiveAttack(coordinate);
      return true;
    } else if (squareState === true) {
      return false;
    } else {
      if (squareState.isAttacked) {
        return false;
      } else {
        oppBoard.receiveAttack(coordinate);
        return true;
      }
    }
  };

  const randomPlay = () => {
    let isValidPlayMade = false;
    while (!isValidPlayMade) {
      isValidPlayMade = attack(randomCoordinate());
    }
  };

  return { attack, randomPlay };
};

export default Player;
