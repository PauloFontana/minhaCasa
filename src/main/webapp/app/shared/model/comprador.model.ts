export interface IComprador {
  id?: number;
  renda?: number;
  garantias?: string;
  userLogin?: string;
  userId?: number;
}

export const defaultValue: Readonly<IComprador> = {};
