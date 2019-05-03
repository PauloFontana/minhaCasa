export interface IMinuta {
  id?: number;
  conteudo?: any;
  imovelId?: number;
  proprietarioId?: number;
  compradorId?: number;
}

export const defaultValue: Readonly<IMinuta> = {};
