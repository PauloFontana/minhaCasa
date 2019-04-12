import { IImovel } from 'app/shared/model/imovel.model';

export interface IClienteComprador {
  id?: number;
  renda?: number;
  garantias?: string;
  imovels?: IImovel[];
}

export const defaultValue: Readonly<IClienteComprador> = {};
