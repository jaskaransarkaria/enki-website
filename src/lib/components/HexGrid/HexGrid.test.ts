import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/svelte";
import HexGrid from "./HexGrid.svelte";

import type { SquareCategory } from "$lib/types/category";

const mockData: SquareCategory[] = [
  {
    id: "111",
    category_data: {
      name: "Elephant",
    },
    custom_attribute_values: {
      epos_now_id: { string_value: null },
      epos_now_nominal_code: { string_value: null },
      image_arr: { string_value: "foobar" },
    },
    children: [],
    parent_category: { id: "222" },
  },
  {
    id: "456",
    category_data: {
      name: "Dog",
    },
    custom_attribute_values: {
      epos_now_id: { string_value: "" },
      epos_now_nominal_code: { string_value: "" },
      image_arr: { string_value: "blahblah" },
    },
    children: [],
    parent_category: { id: null },
  },
] as unknown as SquareCategory[];

describe("GIVEN HexGrid", () => {
  describe("WHEN rendered with NO props", () => {
    it("THEN do NOT render any hexagons AND show loading spinner", () => {
      window.HTMLElement.prototype.scrollIntoView = function () {};
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

    it("AND the hexagon links to have the correct paths", async () => {
      render(HexGrid, {
        data: mockData,
      });

      const hexButtons = screen.getAllByRole("link");

      expect(hexButtons[0]).toHaveAttribute(
        "href",
        "/shop/category/111?name=Elephant&imgHash=foobar&l=true"
      );
      expect(hexButtons[1]).toHaveAttribute(
        "href",
        "/shop/category/456?name=Dog&imgHash=blahblah&l=true"
      );
    });
  });
});
