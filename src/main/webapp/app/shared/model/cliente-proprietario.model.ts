import { IImovel } from 'app/shared/model/imovel.model';

export interface IClienteProprietario {
  id?: number;
  contaCorrente?: string;
  imovels?: IImovel[];
}

export const defaultValue: Readonly<IClienteProprietario> = {};
