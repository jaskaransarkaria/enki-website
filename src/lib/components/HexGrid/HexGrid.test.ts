import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/svelte";
import HexGrid from "./HexGrid.svelte";

import type { Category } from "$lib/types/category";
import userEvent from "@testing-library/user-event";

const mockData: Category[] = [
  {
    Id: 123,
    Name: "Elephant",
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
      render(HexGrid, {
        data: mockData,
      });
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
      expect(screen.getByTestId("hex-category-name")).toHaveTextContent(
        "Elephant"
      );
      expect(screen.getByTestId("hex-image")).toBeInTheDocument();
      expect(screen.getByTestId("hex-image-fallback")).toHaveAttribute(
        "src",
        "https://enki.imgix.net/faith.jpg?auto=format,compress"
      );
      expect(screen.getByTestId("hex-image")).toHaveAttribute(
        "srcset",
        "https://enki.imgix.net/123?auto=format,compress"
      );
    });

    it.skip("AND NominalCode property is 'NOT_WEB' THEN do not render that hexagon", () => {
      render(HexGrid, {
        data: [
          ...mockData,
          { ...mockData[0], Id: 456, NominalCode: "NOT_WEB", Name: "Dog" },
        ],
      });
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
      expect(screen.getByTestId("hex-category-name")).toHaveTextContent(
        "Elephant"
      );
      expect(screen.queryByText("Dog")).not.toBeInTheDocument();
      expect(screen.getByTestId("hex-image")).toBeInTheDocument();
      expect(screen.getByTestId("hex-image-fallback")).toHaveAttribute(
        "src",
        "https://enki.imgix.net/faith.jpg?auto=format,compress"
      );
      expect(screen.getByTestId("hex-image")).toHaveAttribute(
        "srcset",
        "https://enki.imgix.net/123?auto=format,compress"
      );
    });

    it.skip("AND the hexagon is clicked THEN fire the function", () => {
      const mockFn = jest.fn();
      render(HexGrid, {
        data: mockData,
        categoryFn: mockFn,
      });

      expect(mockFn).toHaveBeenCalledTimes(0);

      userEvent.click(screen.getByTestId("hex-button"));

      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });
});
