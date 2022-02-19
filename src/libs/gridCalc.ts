const gridCols: { [key: string]: number } = {
  lessThan360AndDefault: 10,
  upTo600: 4,
  '600to900': 6,
  '900to1200': 8,
  '1960plus': 14,
};

export const getGridCols = (width: number): number => {
  if (width >= 1960) {
    return gridCols['1960plus'];
  }
  if (width >= 900 && width <= 1200) {
    return gridCols['900to1200'];
  }
  if (width >= 600 && width <= 900) {
    return gridCols['600to900'];
  }
  if (width <= 600) {
    return gridCols['upTo600'];
  }
  return gridCols['lessThan360AndDefault'];
};

export const calcShowGrid = (width: number, dataLength: number): boolean =>
  getGridCols(width) - dataLength * 2 < 2 ? true : false;

export const calcRowNumber = (
  arrLength: number,
  rowWidth: number,
  rowCount: number
): number => {
  if (rowCount % 2 === 0) {
    if (arrLength <= rowWidth - 1) {
      return rowCount;
    }
    // its even row so - 1
    arrLength -= rowWidth - 1;
    return calcRowNumber(arrLength, rowWidth, ++rowCount);
  }

  if (arrLength <= rowWidth) {
    return rowCount;
  }

  // it's a odd row keep row width as is
  arrLength -= rowWidth;
  return calcRowNumber(arrLength, rowWidth, ++rowCount);
};
