const Ship = (length, isHor = true) => {
  let hits = Array(length).fill(false);
  let isHorizontal = isHor;

  const hit = (number) => {
    hits[number] = true;
  };

  const isSunk = () => {
    return hits.every((hit) => hit);
  };

  const getHits = () => {
    return hits;
  };

  const getIsHor = () => {
    return isHorizontal;
  };

  return { hit, isSunk, getHits, getIsHor };
};

export default Ship;
