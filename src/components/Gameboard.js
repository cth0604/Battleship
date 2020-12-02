const Gameboard = () => {
  /*
    false: no ship && no hit
    true: no ship && hit
    {isHit: false}: ship && no hit
    {isHit: true}: ship && hit
  */

  let board = Array(10)
    .fill(false)
    .map((x) => Array(10).fill(false));

  const ships = [];

  const getBoard = () => {
    return board;
  };

  const checkShipAround = (coordinate) => {
    for (let i = coordinate.x - 1; i < coordinate.x + 2; i++) {
      if (i >= 0 && i <= 9) {
        for (let j = coordinate.y - 1; j < coordinate.y + 2; j++) {
          if (j >= 0 && j <= 9) {
            if (typeof board[j][i] === 'object') {
              return true;
            }
          }
        }
      }
    }
    return false;
  };

  const checkValidity = (length, isHor, coordinate) => {
    if (isHor) {
      if (coordinate.x + length - 1 > 9) {
        return false;
      } else {
        for (let i = coordinate.x; i < coordinate.x + length; i++) {
          if (checkShipAround({ x: i, y: coordinate.y })) {
            return false;
          }
        }
        return true;
      }
    } else {
      if (coordinate.y + length - 1 > 9) {
        return false;
      } else {
        for (let i = coordinate.y; i < coordinate.y + length; i++) {
          if (checkShipAround({ x: coordinate.x, y: i })) {
            return false;
          }
        }
        return true;
      }
    }
  };

  const placeShip = (ship, coordinate) => {
    const length = ship.getHits().length;
    const isHor = ship.getIsHor();
    if (checkValidity(length, isHor, coordinate)) {
      ships.push(ship);
      if (isHor) {
        for (let i = coordinate.x; i < coordinate.x + length; i++) {
          board[coordinate.y][i] = { ship: ship, index: i - coordinate.x };
        }
      } else {
        for (let i = coordinate.y; i < coordinate.y + length; i++) {
          board[i][coordinate.x] = { ship: ship, index: i - coordinate.y };
        }
      }
    }
  };

  const receiveAttack = (coordinate) => {
    if (!board[coordinate.y][coordinate.x]) {
      board[coordinate.y][coordinate.x] = true;
    } else {
      const { ship, index } = board[coordinate.y][coordinate.x];
      ship.hit(index);
    }
  };

  const allSunk = () => {
    return ships.every((ship) => {
      return ship.isSunk();
    });
  };

  return { getBoard, placeShip, receiveAttack, allSunk };
};

export default Gameboard;
