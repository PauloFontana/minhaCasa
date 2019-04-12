import { IClienteProprietario } from 'app/shared/model/cliente-proprietario.model';
import { IClienteComprador } from 'app/shared/model/cliente-comprador.model';

export interface ICliente {
  id?: number;
  nome?: string;
  cpf?: number;
  endereco?: string;
  telefone?: number;
  clienteProprietario?: IClienteProprietario;
  clienteComprador?: IClienteComprador;
}

export const defaultValue: Readonly<ICliente> = {};
