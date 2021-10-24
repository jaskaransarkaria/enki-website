import type { Tag } from './tag';
import type { Base } from './base';

export interface Product extends Base {
  CategoryId: number;
  Description: string;
  SalePrice: number;
  ProductImages: string[];
  ProductTags: Tag[];
  VariantGroupId: number;
  CurrentStock: number;
}
