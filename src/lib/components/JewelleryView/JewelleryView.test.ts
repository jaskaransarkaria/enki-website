import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/svelte";
import JewelleryView from "./JewelleryView.svelte";

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

describe("GIVEN JewelleryView", () => {
  describe("WHEN rendered with props", () => {
    it("THEN display products by type", () => {
      render(JewelleryView, {
        data: [
          {
            Name: "fine jewellery",
            Id: 111,
            ParentId: 222,
            Children: [],
            NominalCode: null,
          },
        ],
        categoryFn: jest.fn(),
      });

      expect(
        screen.getByRole("heading", { level: 1, name: "Shop by type" })
      ).toBeInTheDocument();
      expect(screen.getByText("fine jewellery")).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { level: 1, name: "Shop by artist" })
      ).toBeInTheDocument();
    });
    it("THEN display products by artist", () => {
      render(JewelleryView, {
        data: [
          {
            Name: "some artist",
            Id: 111,
            ParentId: 222,
            Children: [],
            NominalCode: null,
          },
        ],
        categoryFn: jest.fn(),
      });

      expect(
        screen.getByRole("heading", { level: 1, name: "Shop by type" })
      ).toBeInTheDocument();
      expect(screen.getByText("some artist")).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { level: 1, name: "Shop by artist" })
      ).toBeInTheDocument();
    });

    it("THEN display products by type and artist", () => {
      render(JewelleryView, {
        data: [
          {
            Name: "fine jewellery",
            Id: 111,
            ParentId: 222,
            Children: [],
            NominalCode: null,
          },
          {
            Name: "some artist",
            Id: 444,
            ParentId: 222,
            Children: [],
            NominalCode: null,
          },
        ],
        categoryFn: jest.fn(),
      });

      expect(
        screen.getByRole("heading", { level: 1, name: "Shop by type" })
      ).toBeInTheDocument();
      expect(screen.getByText("some artist")).toBeInTheDocument();
      expect(screen.getByText("fine jewellery")).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { level: 1, name: "Shop by artist" })
      ).toBeInTheDocument();
    });
  });
});
