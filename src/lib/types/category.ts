import type { Base } from "$lib/types/base";
import type { Attr } from "$lib/types/customAttributes";

export interface Category extends Base {
  CategoryId?: number; // if its a variant
  ParentId: number | null;
  Children: Category[];
  NominalCode: string | null;
  Description: string;
}

export interface CategoryPathToRootNode {
  category_id: string;
  category_name: string;
}

export interface CatalogObjectCategory {
  id: string;
}

export interface CategoryData {
  name: string;
  parent_category: CatalogObjectCategory;
  is_top_level: boolean;
  root_category: string;
  path_to_root: CategoryPathToRootNode[];
}

interface CustomCatAttributeVals {
  epos_now_id: Attr;
  image_arr: Attr;
  epos_now_nominal_code: Attr;
  epos_now_root_parent_id: Attr;
  epos_now_parent_id: Attr;
}

export interface SquareCategory {
  id: string;
  children: SquareCategory[];
  category_data: CategoryData;
  custom_attribute_values: CustomCatAttributeVals;
}
