import Ship from "../components/Ship";

describe("test Ship.hit()", () => {
  const ship = Ship(4);
  test("hit position 2", () => {
    ship.hit(2);
    expect(ship.getHits()).toEqual([false, false, true, false]);
  });
  test("hit position 3", () => {
    ship.hit(3);
    expect(ship.getHits()).toEqual([false, false, true, true]);
  });
  test("hit same position again", () => {
    ship.hit(3);
    expect(ship.getHits()).toEqual([false, false, true, true]);
  });
  test("hit all positions", () => {
    ship.hit(0);
    ship.hit(1);
    expect(ship.getHits()).toEqual([true, true, true, true]);
  });
});

describe("test Ship.isSunk()", () => {
  const ship = Ship(4);
  test("ship is not hit", () => {
    expect(ship.isSunk()).toBeFalsy();
  });
  test("ship is hit but not sunk", () => {
    ship.hit(3);
    expect(ship.isSunk()).toBeFalsy();
  });
  test("ship is sunk", () => {
    ship.hit(0);
    ship.hit(1);
    ship.hit(2);
    expect(ship.isSunk()).toBeTruthy();
  });
});
