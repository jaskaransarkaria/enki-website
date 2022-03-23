export interface Base {
	Name: string;
	Id: number;
}

export type BaseFn = <T extends Base>(a: T) => string;
