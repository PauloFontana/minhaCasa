import { Moment } from 'moment';

export interface IPagamento {
  id?: number;
  valor?: number;
  data?: Moment;
  compradorId?: number;
  corretorId?: number;
}

export const defaultValue: Readonly<IPagamento> = {};
