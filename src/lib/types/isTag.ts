import type { Base } from '$lib/types/base';
import type { Tag } from '$lib/types/tag';

const isTag = (obj: Base): obj is Tag => 'TagTypeId' in obj;

export default isTag;
