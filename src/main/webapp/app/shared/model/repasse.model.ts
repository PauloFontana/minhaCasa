export interface IRepasse {
  id?: number;
  valor?: number;
  proprietarioId?: number;
  corretorId?: number;
}

export const defaultValue: Readonly<IRepasse> = {};
