import { writable } from "svelte/store";
import type { SquareCategory } from "$lib/types/category";

export const InitialValue: SquareCategory[] = [
  {
    id: "",
    category_data: {
      name: "Shop",
      parent_category: { id: "" },
      is_top_level: true,
      root_category: "",
      path_to_root: [{ category_id: "", category_name: "" }],
    },
    children: [],
    custom_attribute_values: {
      epos_now_id: {
        string_value: "",
        key: "",
        custom_attribute_definition_id: "",
        type: "",
        name: "",
      },
      epos_now_nominal_code: {
        string_value: "",
        key: "",
        custom_attribute_definition_id: "",
        type: "",
        name: "",
      },
      epos_now_root_parent_id: {
        string_value: "",
        key: "",
        custom_attribute_definition_id: "",
        type: "",
        name: "",
      },
      epos_now_parent_id: {
        string_value: "",
        key: "",
        custom_attribute_definition_id: "",
        type: "",
        name: "",
      },
      image_arr: {
        string_value: "",
        key: "",
        custom_attribute_definition_id: "",
        type: "",
        name: "",
      },
    },
  },
];

export const categories = writable<SquareCategory>(InitialValue);

export const readonlyAllCategories = writable<readonly SquareCategory[]>([]);

export const reset: () => void = () => categories.set(InitialValue);

export const resetReadonlyAllCategoriesStore: () => void = () =>
  readonlyAllCategories.set([]);
