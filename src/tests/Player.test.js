import Player from "../components/Player";
import Gameboard from "../components/Gameboard";
import Ship from "../components/Ship";

describe("test Player.attack()", () => {
  const gameBoard = Gameboard();
  const player = Player(gameBoard);
  test("attack unattacked empty square", () => {
    expect(player.attack({ x: 5, y: 5 })).toBeTruthy();
  });
  test("attack attacked empty square", () => {
    expect(player.attack({ x: 5, y: 5 })).toBeFalsy();
  });
  const ship = Ship(3);
  gameBoard.placeShip(ship, { x: 1, y: 1 });
  test("attack unattacked occupied square", () => {
    expect(player.attack({ x: 1, y: 1 })).toBeTruthy();
  });
  test("attack attacked occupied square", () => {
    expect(player.attack({ x: 1, y: 1 })).toBeFalsy();
  });
});
