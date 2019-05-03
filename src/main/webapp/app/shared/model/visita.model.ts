import { Moment } from 'moment';

export interface IVisita {
  id?: number;
  data?: Moment;
  avaliacao?: any;
  imovelId?: number;
  corretorId?: number;
}

export const defaultValue: Readonly<IVisita> = {};
