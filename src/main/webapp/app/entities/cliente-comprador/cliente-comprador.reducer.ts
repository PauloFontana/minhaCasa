import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IClienteComprador, defaultValue } from 'app/shared/model/cliente-comprador.model';

export const ACTION_TYPES = {
  FETCH_CLIENTECOMPRADOR_LIST: 'clienteComprador/FETCH_CLIENTECOMPRADOR_LIST',
  FETCH_CLIENTECOMPRADOR: 'clienteComprador/FETCH_CLIENTECOMPRADOR',
  CREATE_CLIENTECOMPRADOR: 'clienteComprador/CREATE_CLIENTECOMPRADOR',
  UPDATE_CLIENTECOMPRADOR: 'clienteComprador/UPDATE_CLIENTECOMPRADOR',
  DELETE_CLIENTECOMPRADOR: 'clienteComprador/DELETE_CLIENTECOMPRADOR',
  RESET: 'clienteComprador/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IClienteComprador>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ClienteCompradorState = Readonly<typeof initialState>;

// Reducer

export default (state: ClienteCompradorState = initialState, action): ClienteCompradorState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CLIENTECOMPRADOR_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CLIENTECOMPRADOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CLIENTECOMPRADOR):
    case REQUEST(ACTION_TYPES.UPDATE_CLIENTECOMPRADOR):
    case REQUEST(ACTION_TYPES.DELETE_CLIENTECOMPRADOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CLIENTECOMPRADOR_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CLIENTECOMPRADOR):
    case FAILURE(ACTION_TYPES.CREATE_CLIENTECOMPRADOR):
    case FAILURE(ACTION_TYPES.UPDATE_CLIENTECOMPRADOR):
    case FAILURE(ACTION_TYPES.DELETE_CLIENTECOMPRADOR):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CLIENTECOMPRADOR_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CLIENTECOMPRADOR):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CLIENTECOMPRADOR):
    case SUCCESS(ACTION_TYPES.UPDATE_CLIENTECOMPRADOR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CLIENTECOMPRADOR):
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

const apiUrl = 'api/cliente-compradors';

// Actions

export const getEntities: ICrudGetAllAction<IClienteComprador> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CLIENTECOMPRADOR_LIST,
  payload: axios.get<IClienteComprador>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IClienteComprador> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CLIENTECOMPRADOR,
    payload: axios.get<IClienteComprador>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IClienteComprador> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CLIENTECOMPRADOR,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IClienteComprador> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CLIENTECOMPRADOR,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IClienteComprador> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CLIENTECOMPRADOR,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
