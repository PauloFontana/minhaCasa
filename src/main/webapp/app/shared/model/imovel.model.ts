export interface IImovel {
  id?: number;
  categoria?: string;
  tipo?: string;
  valor?: number;
  atributos?: string;
  proprietarioId?: number;
}

export const defaultValue: Readonly<IImovel> = {};
