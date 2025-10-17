import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/svelte";
import Hex from "./Hex.svelte";

describe("GIVEN Hex", () => {
  describe("WHEN rendered", () => {
    it("THEN display an Empty Hex", () => {
      render(Hex, {
        category: {
          id: "111",
          category_data: {
            name: "example",
          },
          custom_attribute_values: {
            epos_now_nominal_code: { string_value: null },
            image_arr: { string_value: "" },
          },
          children: [],
          parent_category: { id: "222" },
        },
        isEmpty: true,
      });
      expect(screen.getByTestId("empty-hex")).toBeInTheDocument();
      expect(
        screen.queryByRole("heading", { level: 3 }),
      ).not.toBeInTheDocument();
    });

    it("THEN display the Hex", () => {
      render(Hex, {
        category: {
          id: "111",
          category_data: {
            name: "example",
          },
          custom_attribute_values: {
            epos_now_nominal_code: { string_value: null },
            image_arr: { string_value: "" },
          },
          children: [],
          parent_category: { id: "222" },
        },
      });
      expect(
        screen.getByRole("heading", { level: 3, name: "example", exact: true }),
      ).toBeInTheDocument();
      expect(screen.queryByTestId("empty-hex")).not.toBeInTheDocument();
    });
  });
});
