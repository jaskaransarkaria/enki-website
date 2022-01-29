import type { Base } from '@/types/base';

export interface Category extends Base {
  ParentId: number | null;
  Children: Category[];
  NominalCode: string;
  IsWet: boolean;
}
