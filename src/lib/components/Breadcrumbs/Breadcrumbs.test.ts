import "@testing-library/jest-dom";
import { vi } from "vitest";
import { tick } from "svelte";
import { render, screen } from "@testing-library/svelte";
import Breadcrumbs from "./Breadcrumbs.svelte";
import { refreshCategories } from "$lib/utils/requests";
import {
  readonlyAllCategories,
  resetReadonlyAllCategoriesStore,
} from "$lib/stores/categories";

vi.mock("$lib/utils/requests");

describe("GIVEN Breadcrumbs", () => {
  beforeEach(() => {
    vi.mocked(refreshCategories).mockResolvedValue([]);
    resetReadonlyAllCategoriesStore();
  });

  afterEach(() => vi.clearAllMocks());

  describe("WHEN rendered no props", () => {
    it("THEN display no breadcrumbs", () => {
      render(Breadcrumbs);
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });
  });

  describe("WHEN rendered with props", () => {
    it("AND the category store is NOT set THEN render breadcrumbs by calling the api", async () => {
      vi.mocked(refreshCategories).mockResolvedValueOnce([
        {
          id: "111",
          category_data: {
            name: "Clothes",

            parent_category: { id: null },
          },
          custom_attribute_values: {
            epos_now_id: { string_value: null },
            epos_now_nominal_code: { string_value: null },
            image_arr: { string_value: "foobar" },
          },
          children: [
            {
              id: "456",
              category_data: {
                name: "Adult Clothes",
                parent_category: { id: "111" },
              },
              custom_attribute_values: {
                epos_now_id: { string_value: "" },
                epos_now_nominal_code: { string_value: "" },
                image_arr: { string_value: "blahblah" },
              },
              children: [],
            },
          ],
        },
      ]);

      render(Breadcrumbs, {
        selectedCategoryId: "456",
      });

      await tick();
      await tick();
      await tick();

      const buttons = screen.getAllByRole("button");

      expect(refreshCategories).toHaveBeenCalledTimes(1);
      expect(buttons[0]).toHaveTextContent("Shop");
      expect(buttons[1]).toHaveTextContent("Clothes");
      expect(buttons[2]).toHaveTextContent("Adult Clothes");
    });

    it("AND the category store IS set THEN render breadcrumbs without calling the api", async () => {
      readonlyAllCategories.set([
        {
          id: "111",
          category_data: {
            name: "Clothes",
            parent_category: { id: null },
          },
          custom_attribute_values: {
            epos_now_id: { string_value: null },
            epos_now_nominal_code: { string_value: null },
            image_arr: { string_value: "foobar" },
          },
          children: [
            {
              id: "456",
              category_data: {
                name: "Adult Clothes",
                parent_category: { id: "111" },
              },
              custom_attribute_values: {
                epos_now_id: { string_value: "" },
                epos_now_nominal_code: { string_value: "" },
                image_arr: { string_value: "blahblah" },
              },
              children: [],
            },
          ],
        },
      ]);
      render(Breadcrumbs, {
        selectedCategoryId: "456",
      });

      await tick();
      await tick();
      await tick();

      const buttons = screen.getAllByRole("button");

      expect(refreshCategories).toHaveBeenCalledTimes(0);
      expect(buttons[0]).toHaveTextContent("Shop");
      expect(buttons[1]).toHaveTextContent("Clothes");
      expect(buttons[2]).toHaveTextContent("Adult Clothes");
    });
  });
});
