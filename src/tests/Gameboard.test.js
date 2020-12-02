import Gameboard from "../components/Gameboard";
import Ship from "../components/Ship";

describe("test Gameboard.placeShip()", () => {
  const gameBoard = Gameboard();
  const shipOne = Ship(2);
  const shipVert = Ship(2, false);

  test("place ship on empty squares", () => {
    gameBoard.placeShip(shipOne, { x: 1, y: 1 });
    expect(gameBoard.getBoard()[1][1]).toEqual({ ship: shipOne, index: 0 });
    expect(gameBoard.getBoard()[1][2]).toEqual({ ship: shipOne, index: 1 });
  });

  test("ship length overflow horizontally", () => {
    gameBoard.placeShip(shipOne, { x: 9, y: 0 });
    expect(gameBoard.getBoard()[0][9]).toBeFalsy();
  });

  test("ship length overflow vertically", () => {
    gameBoard.placeShip(shipVert, { x: 0, y: 9 });
    expect(gameBoard.getBoard()[9][0]).toBeFalsy();
  });

  test("place ship on occupied squares", () => {
    gameBoard.placeShip(shipVert, { x: 1, y: 0 });
    expect(gameBoard.getBoard()[0][1]).toBeFalsy();
    expect(gameBoard.getBoard()[1][1]).toBeTruthy();
  });
});

describe("test Gameboard.receiveAttack()", () => {
  const gameBoard = Gameboard();
  const shipOne = Ship(2);
  test("attack unoccupied square", () => {
    gameBoard.receiveAttack({ x: 5, y: 5 });
    expect(gameBoard.getBoard()[5][5]).toBeTruthy();
  });
  test("attack occupied square", () => {
    gameBoard.placeShip(shipOne, { x: 5, y: 5 });
    gameBoard.receiveAttack({ x: 5, y: 5 });
    expect(gameBoard.getBoard()[5][5].ship.getHits()[0]).toBeTruthy();
  });
});

describe("test Gameboard.allSunk()", () => {
  const gameBoard = Gameboard();
  const shipOne = Ship(1);
  const shipVert = Ship(1, false);
  test("no ships", () => {
    expect(gameBoard.allSunk()).toBeTruthy();
  });
  test("multiple ships no sunk", () => {
    gameBoard.placeShip(shipOne, { x: 1, y: 1 });
    gameBoard.placeShip(shipVert, { x: 4, y: 5 });
    expect(gameBoard.allSunk()).toBeFalsy();
  });
  test("multiple ships one sunk", () => {
    gameBoard.receiveAttack({ x: 1, y: 1 });
    expect(gameBoard.allSunk()).toBeFalsy();
  });
  test("multiple ships all sunk", () => {
    gameBoard.receiveAttack({ x: 4, y: 5 });
    expect(gameBoard.allSunk()).toBeTruthy();
  });
});
