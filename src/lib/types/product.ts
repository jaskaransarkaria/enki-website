import type { Tag } from "./tag";
import type { Base } from "./base";

export interface Product extends Base {
  CategoryId: number;
  Description: string;
  SalePrice: number;
  ProductImages: ProductImages[];
  ProductTags: Tag[];
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
