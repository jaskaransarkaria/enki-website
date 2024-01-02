import "@testing-library/jest-dom";
import { vi } from "vitest";
import { render, screen } from "@testing-library/svelte";
import TagView from "./TagView.svelte";

import type { Category } from "$lib/types/category";

vi.mock("$lib/utils/requests");

const mockData: Category[] = [
  {
    Id: 123,
    Name: "Elephant",
    ParentId: null,
    Children: [],
    NominalCode: "",
    Description: "",
  },
];

describe("Given TagView", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("WHEN rendered without props and no tags", () => {
    it("THEN show no categories at all", () => {
      const { container } = render(TagView);
      expect(container.children).toHaveLength(1);
    });
  });

  describe("WHEN rendered with props", () => {
    const mockFn = jest.fn();
    it("AND there is no tags data THEN show just the other categories", () => {
      render(TagView, {
        data: mockData,
        categoryFn: mockFn,
        tags: [],
      });

      expect(screen.getByTestId("hex-category-name")).toHaveTextContent(
        "Elephant"
      );
      expect(screen.getAllByTestId("hex-category-name")).toHaveLength(1);
    });

    it("AND there is tag data THEN show both tag and other categories", async () => {
      render(TagView, {
        data: mockData,
        categoryFn: mockFn,
        prefix: "prefix",
        tags: [
          {
            Id: 789,
            Name: "prefix-Zebra",
            TagTypeId: "999",
          },
        ],
      });

      const allDisplayedCats = screen.queryAllByTestId("hex-category-name");
      expect(allDisplayedCats).toHaveLength(2);
      expect(allDisplayedCats[0]).toHaveTextContent("Elephant");
      expect(allDisplayedCats[1]).toHaveTextContent("Zebra");
    });

    it("AND there is multiple tags THEN order the tags alphabetically z to a", async () => {
      render(TagView, {
        data: [],
        categoryFn: mockFn,
        prefix: "prefix",
        tags: [
          {
            Id: 999,
            Name: "prefix-Ant",
            TagTypeId: "999",
          },
          {
            Id: 789,
            Name: "prefix-Zebra",
            TagTypeId: "999",
          },
        ],
      });

      const allDisplayedCats = screen.queryAllByTestId("hex-category-name");
      expect(allDisplayedCats).toHaveLength(2);
      expect(allDisplayedCats[0]).toHaveTextContent("Zebra");
      expect(allDisplayedCats[1]).toHaveTextContent("Ant");
    });

    it("THEN a tag category has the href constructed from category id and tag id", async () => {
      render(TagView, {
        data: mockData,
        categoryFn: () => "mock-href",
        prefix: "prefix",
        tags: [
          {
            Id: 789,
            Name: "prefix-Buffalo",
            TagTypeId: "999",
          },
        ],
      });

      const allDisplayedCats = screen.queryAllByTestId("hex-category-name");

      expect(allDisplayedCats).toHaveLength(2);
      expect(allDisplayedCats[0]).toHaveTextContent("Elephant");
      expect(allDisplayedCats[1]).toHaveTextContent("Buffalo");

      const allButtons = screen.queryAllByTestId("hex-link");

      expect(allButtons[1]).toHaveAttribute(
        "href",
        `/shop/tag/prefix-buffalo?catid=0&tagid=789`
      );
    });
  });
});
