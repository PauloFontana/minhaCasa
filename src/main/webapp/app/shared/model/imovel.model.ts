import { IClienteProprietario } from 'app/shared/model/cliente-proprietario.model';
import { IClienteComprador } from 'app/shared/model/cliente-comprador.model';

export interface IImovel {
  id?: number;
  categoria?: string;
  tipo?: string;
  valor?: number;
  atributos?: string;
  clienteProprietario?: IClienteProprietario;
  clienteComprador?: IClienteComprador;
}

export const defaultValue: Readonly<IImovel> = {};
