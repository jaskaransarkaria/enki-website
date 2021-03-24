import type { Tag } from './tag';

export interface Product {
  Name: string;
  Id: number;
  CategoryId: number;
  Description: string;
  SalePrice: string;
  ProductImages: string[];
  ProductTags: Tag[];
  VariantGroupId: number;
}
