import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IClienteProprietario, defaultValue } from 'app/shared/model/cliente-proprietario.model';

export const ACTION_TYPES = {
  FETCH_CLIENTEPROPRIETARIO_LIST: 'clienteProprietario/FETCH_CLIENTEPROPRIETARIO_LIST',
  FETCH_CLIENTEPROPRIETARIO: 'clienteProprietario/FETCH_CLIENTEPROPRIETARIO',
  CREATE_CLIENTEPROPRIETARIO: 'clienteProprietario/CREATE_CLIENTEPROPRIETARIO',
  UPDATE_CLIENTEPROPRIETARIO: 'clienteProprietario/UPDATE_CLIENTEPROPRIETARIO',
  DELETE_CLIENTEPROPRIETARIO: 'clienteProprietario/DELETE_CLIENTEPROPRIETARIO',
  RESET: 'clienteProprietario/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IClienteProprietario>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ClienteProprietarioState = Readonly<typeof initialState>;

// Reducer

export default (state: ClienteProprietarioState = initialState, action): ClienteProprietarioState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CLIENTEPROPRIETARIO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CLIENTEPROPRIETARIO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CLIENTEPROPRIETARIO):
    case REQUEST(ACTION_TYPES.UPDATE_CLIENTEPROPRIETARIO):
    case REQUEST(ACTION_TYPES.DELETE_CLIENTEPROPRIETARIO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CLIENTEPROPRIETARIO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CLIENTEPROPRIETARIO):
    case FAILURE(ACTION_TYPES.CREATE_CLIENTEPROPRIETARIO):
    case FAILURE(ACTION_TYPES.UPDATE_CLIENTEPROPRIETARIO):
    case FAILURE(ACTION_TYPES.DELETE_CLIENTEPROPRIETARIO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CLIENTEPROPRIETARIO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CLIENTEPROPRIETARIO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CLIENTEPROPRIETARIO):
    case SUCCESS(ACTION_TYPES.UPDATE_CLIENTEPROPRIETARIO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CLIENTEPROPRIETARIO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/cliente-proprietarios';

// Actions

export const getEntities: ICrudGetAllAction<IClienteProprietario> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CLIENTEPROPRIETARIO_LIST,
  payload: axios.get<IClienteProprietario>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IClienteProprietario> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CLIENTEPROPRIETARIO,
    payload: axios.get<IClienteProprietario>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IClienteProprietario> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CLIENTEPROPRIETARIO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IClienteProprietario> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CLIENTEPROPRIETARIO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IClienteProprietario> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CLIENTEPROPRIETARIO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
