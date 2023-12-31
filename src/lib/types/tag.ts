import type { Base } from "$lib/types/base";

export interface Tag extends Base {
  TagTypeId: string;
  Description?: string;
}
