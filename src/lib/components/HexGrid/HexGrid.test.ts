import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/svelte";
import HexGrid from "./HexGrid.svelte";

import type { Category } from "$lib/types/category";

const mockData: Category[] = [
  {
    Id: 123,
    Name: "Elephant",
    ParentId: null,
    Children: [],
    NominalCode: "",
  },
  {
    Id: 456,
    Name: "Dog",
    ParentId: null,
    Children: [],
    NominalCode: "",
  },
];

describe("GIVEN HexGrid", () => {
  describe("WHEN rendered with NO props", () => {
    it("THEN do NOT render any hexagons AND show loading spinner", () => {
      const { container } = render(HexGrid);
      expect(container.children).toHaveLength(1);
      expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    });
  });

  describe("WHEN rendered WITH props", () => {
    it("THEN render hexagons", () => {
      const mockCategoryFn = jest.fn((cat) => `/${cat.Name}`);
      render(HexGrid, {
        data: mockData,
        categoryFn: mockCategoryFn,
      });

      const allHexes = screen.getAllByTestId("hex-category-name");
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
      expect(allHexes[0]).toHaveTextContent("Elephant");
      expect(allHexes[1]).toHaveTextContent("Dog");
    });

    it("AND NominalCode property is 'NOT_WEB' THEN do not render that hexagon", () => {
      const mockCategoryFn = jest.fn((cat) => `/${cat.Name}`);
      render(HexGrid, {
        data: [
          ...mockData,
          { ...mockData[0], Id: 456, NominalCode: "NOT_WEB", Name: "Hamster" },
        ],
        categoryFn: mockCategoryFn,
      });

      const allHexes = screen.getAllByTestId("hex-category-name");
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
      expect(allHexes[0]).toHaveTextContent("Elephant");
      expect(allHexes[1]).toHaveTextContent("Dog");
      expect(screen.queryByText("Hamster")).not.toBeInTheDocument();
    });

    it("AND the hexagon links to have the correct paths", async () => {
      const mockCategoryFn = jest.fn((cat) => `/${cat.Name}`);
      render(HexGrid, {
        data: mockData,
        categoryFn: mockCategoryFn,
      });

      expect(mockCategoryFn).toHaveBeenCalledTimes(2); // once for each hex to set up the href

      const hexButtons = screen.getAllByRole("link");

      expect(hexButtons[0]).toHaveAttribute("href", "/Elephant");
      expect(hexButtons[1]).toHaveAttribute("href", "/Dog");
    });
  });
});
