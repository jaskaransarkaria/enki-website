const gridCols = {
  lessThan360AndDefault: 10,
  upTo600: 4,
  "600to900": 6,
  "900to1200": 8,
  "1960plus": 14
};
const getGridCols = (width) => {
  if (width >= 1960) {
    return gridCols["1960plus"];
  }
  if (width >= 900 && width <= 1200) {
    return gridCols["900to1200"];
  }
  if (width >= 600 && width <= 900) {
    return gridCols["600to900"];
  }
  if (width <= 600) {
    return gridCols["upTo600"];
  }
  return gridCols["lessThan360AndDefault"];
};
const calcShowGrid = (width, dataLength) => getGridCols(width) - dataLength * 3 < 2 ? true : false;
const calcRowNumber = (arrLength, rowWidth, rowCount) => {
  if (rowCount % 2 === 0) {
    if (arrLength <= rowWidth - 1) {
      return rowCount;
    }
    arrLength -= rowWidth - 1;
    return calcRowNumber(arrLength, rowWidth, ++rowCount);
  }
  if (arrLength <= rowWidth) {
    return rowCount;
  }
  arrLength -= rowWidth;
  return calcRowNumber(arrLength, rowWidth, ++rowCount);
};
export { calcShowGrid as a, calcRowNumber as c };
