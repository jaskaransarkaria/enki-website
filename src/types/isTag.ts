import type { Base } from '@/types/base';
import type { Tag } from '@/types/tag';

const isTag = (obj: Base): obj is Tag => 'TagTypeId' in obj;

export default isTag;
