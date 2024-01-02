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
    Description: "foobar",
  },
  {
    Id: 456,
    Name: "Dog",
    ParentId: null,
    Children: [],
    NominalCode: "",
    Description: "blahblah",
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
      render(HexGrid, {
        data: mockData,
      });

      const allHexes = screen.getAllByTestId("hex-category-name");
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
      expect(allHexes[0]).toHaveTextContent("Elephant");
      expect(allHexes[1]).toHaveTextContent("Dog");
    });

    it("AND NominalCode property is 'NOT_WEB' THEN do not render that hexagon", () => {
      render(HexGrid, {
        data: [
          ...mockData,
          { ...mockData[0], Id: 456, NominalCode: "NOT_WEB", Name: "Hamster" },
        ],
      });

      const allHexes = screen.getAllByTestId("hex-category-name");
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
      expect(allHexes[0]).toHaveTextContent("Elephant");
      expect(allHexes[1]).toHaveTextContent("Dog");
      expect(screen.queryByText("Hamster")).not.toBeInTheDocument();
    });

    it("AND the hexagon links to have the correct paths", async () => {
      render(HexGrid, {
        data: mockData,
      });

      const hexButtons = screen.getAllByRole("link");

      expect(hexButtons[0]).toHaveAttribute(
        "href",
        "/shop/category/123?name=Elephant&imgHash=foobar"
      );
      expect(hexButtons[1]).toHaveAttribute(
        "href",
        "/shop/category/456?name=Dog&imgHash=blahblah"
      );
    });
  });
});
