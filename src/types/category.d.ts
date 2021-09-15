export interface Category {
  Id: number;
  ParentId: number | null;
  Name: string;
  Children: Category[];
}
