import { ICorretor } from 'app/shared/model/corretor.model';

export interface IImobiliaria {
  id?: number;
  login?: string;
  password?: string;
  nome?: string;
  cnpj?: string;
  endereco?: string;
  telefone?: string;
  corretors?: ICorretor[];
}

export const defaultValue: Readonly<IImobiliaria> = {};
