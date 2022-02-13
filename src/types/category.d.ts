import type { Base } from '@/types/base';

export interface Category extends Base {
  CategoryId?: number;
  ParentId: number | null;
  Children: Category[];
  NominalCode: string | null;
}
