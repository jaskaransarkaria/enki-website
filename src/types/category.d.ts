import type { Base } from '@/types/base';

export interface Category extends Base {
  CategoryId?: number; // if its a variant
  ParentId: number | null;
  Children: Category[];
  NominalCode: string | null;
}
