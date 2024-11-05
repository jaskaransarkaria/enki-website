import type { Base } from "./base";
import type { Attr } from "./customAttributes";
import type { CatalogObjectCategory } from "./category";

export interface Product extends Base {
  CategoryId: number;
  Description: string;
  SalePrice: number;
  ProductImages: ProductImages[];
  VariantGroupId: number;
  CurrentStock: number;
  ProductDetails: ProductDetails | null;
  SellOnWeb: boolean;
  IsArchived: boolean;
}

interface ProductDetails {
  DetailedDescription: string;
}

interface ProductImages {
  ImageUrl: string;
}

interface CustomItemAttributeVals {
  epos_now_id: Attr;
  image_arr: Attr;
  epos_now_category_id: Attr;
  epos_now_tags: Attr;
}

interface PriceMoney {
  amount: number;
}

interface ItemVariationData {
  name: string;
  item_id: string;
  price_money: PriceMoney;
  quantity: string;
}

export interface VariationData {
  id: string;
  item_variation_data: ItemVariationData;
  custom_attribute_values: CustomItemAttributeVals;
}

interface ItemData {
  name: string;
  categories: CatalogObjectCategory[];
  description_html: string;
  is_archived: boolean;
  ecom_visibility: string;
  product_type: string;
  variations: VariationData[];
}

export interface SquareProduct {
  id: string;
  item_data: ItemData;
  custom_attribute_values: CustomItemAttributeVals;
  updated_at: string;
}
