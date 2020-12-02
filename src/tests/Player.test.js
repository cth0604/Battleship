import Player from "../components/Player";
import Gameboard from "../components/Gameboard";
import Ship from "../components/Ship";
jest.mock("GameBoard");
Gameboard.receiveAttack.mockImplementation(() => {});

describe("test Player.attack()", () => {
  const gameBoard = Gameboard();
  const player = Player(gameBoard);
  test("attack unoccupied square", () => {
    player.attack({ x: 5, y: 5 });
    expect(Gameboard.receiveAttack.mock.calls.length).toBe(1);
  });
  test("attack already attcked square", () => {
    player.attack({ x: 5, y: 5 });
    expect(Gameboard.receiveAttack.mock.calls.length).toBe(1);
  });
});
