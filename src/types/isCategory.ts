import type { Base } from '@/types/base';
import type { Category } from '@/types/category';

const isCategory = (obj: Base): obj is Category =>
  'ParentId' in obj && 'Children' in obj && 'NominalCode' in obj;

export default isCategory;
