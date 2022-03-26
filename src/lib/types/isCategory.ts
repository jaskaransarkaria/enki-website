import type { Base } from "$lib/types/base";
import type { Category } from "$lib/types/category";

const isCategory = (obj: Base): obj is Category =>
  "ParentId" in obj && "Children" in obj && "NominalCode" in obj;

export default isCategory;
