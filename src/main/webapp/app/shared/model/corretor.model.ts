export interface ICorretor {
  id?: number;
  registroImobiliaria?: string;
  password?: string;
  numeroCreci?: string;
  contaCorrente?: string;
  imobiliariaId?: number;
}

export const defaultValue: Readonly<ICorretor> = {};
