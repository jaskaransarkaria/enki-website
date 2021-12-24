const gridCols: { [key: string]: number } = {
  lessThan360AndDefault: 10,
  upTo600: 4,
  '600to900': 6,
  '900to1200': 8,
  '1960plus': 14,
};

const getGridCols = (width: number) => {
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
  getGridCols(width) - dataLength * 2 <= 2 ? true : false;
