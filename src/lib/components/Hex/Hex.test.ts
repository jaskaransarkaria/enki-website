import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/svelte";
import Hex from "./Hex.svelte";

describe("GIVEN Hex", () => {
  describe("WHEN rendered", () => {
    it("THEN display an Empty Hex", () => {
      render(Hex, {
        category: {
          Name: "example",
          Id: 111,
          ParentId: 222,
          Children: [],
          NominalCode: null,
        },
        isEmpty: true,
      });
      expect(screen.getByTestId("empty-hex")).toBeInTheDocument();
      expect(
        screen.queryByRole("heading", { level: 3 })
      ).not.toBeInTheDocument();
    });

    it("THEN display the Hex", () => {
      render(Hex, {
        category: {
          Name: "example",
          Id: 111,
          ParentId: 222,
          Children: [],
          NominalCode: null,
        },
      });
      expect(
        screen.getByRole("heading", { level: 3, name: "example", exact: true })
      ).toBeInTheDocument();
      expect(screen.queryByTestId("empty-hex")).not.toBeInTheDocument();
    });

    it("AND the prop is a Tag THEN render the tag", () => {
      render(Hex, {
        category: {
          Name: "costume-example",
          Id: 111,
          ParentId: 222,
          Children: [],
          NominalCode: null,
          TagTypeId: "123",
        },
      });
      expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
        "example"
      );
      expect(screen.queryByTestId("empty-hex")).not.toBeInTheDocument();
    });

    it("THEN fire the categoryFn when the category Hex is clicked", () => {
      const mockCategoryFn = jest.fn((cat) => `/${cat.Name}`);
      render(Hex, {
        category: {
          Name: "example",
          Id: 111,
          ParentId: 222,
          Children: [],
          NominalCode: null,
        },
        categoryFn: mockCategoryFn,
      });

      expect(mockCategoryFn).toHaveBeenCalledTimes(1);
      expect(mockCategoryFn).toHaveReturnedWith("/example");
      expect(screen.getByRole("link")).toHaveAttribute("href", "/example");
      expect(screen.queryByTestId("empty-hex")).not.toBeInTheDocument();
    });
  });
});
