import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IComprador, defaultValue } from 'app/shared/model/comprador.model';

export const ACTION_TYPES = {
  FETCH_COMPRADOR_LIST: 'comprador/FETCH_COMPRADOR_LIST',
  FETCH_COMPRADOR: 'comprador/FETCH_COMPRADOR',
  CREATE_COMPRADOR: 'comprador/CREATE_COMPRADOR',
  UPDATE_COMPRADOR: 'comprador/UPDATE_COMPRADOR',
  DELETE_COMPRADOR: 'comprador/DELETE_COMPRADOR',
  RESET: 'comprador/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IComprador>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type CompradorState = Readonly<typeof initialState>;

// Reducer

export default (state: CompradorState = initialState, action): CompradorState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_COMPRADOR_LIST):
    case REQUEST(ACTION_TYPES.FETCH_COMPRADOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_COMPRADOR):
    case REQUEST(ACTION_TYPES.UPDATE_COMPRADOR):
    case REQUEST(ACTION_TYPES.DELETE_COMPRADOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_COMPRADOR_LIST):
    case FAILURE(ACTION_TYPES.FETCH_COMPRADOR):
    case FAILURE(ACTION_TYPES.CREATE_COMPRADOR):
    case FAILURE(ACTION_TYPES.UPDATE_COMPRADOR):
    case FAILURE(ACTION_TYPES.DELETE_COMPRADOR):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_COMPRADOR_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_COMPRADOR):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_COMPRADOR):
    case SUCCESS(ACTION_TYPES.UPDATE_COMPRADOR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_COMPRADOR):
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

const apiUrl = 'api/compradors';

// Actions

export const getEntities: ICrudGetAllAction<IComprador> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_COMPRADOR_LIST,
  payload: axios.get<IComprador>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IComprador> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_COMPRADOR,
    payload: axios.get<IComprador>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IComprador> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_COMPRADOR,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IComprador> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_COMPRADOR,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IComprador> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_COMPRADOR,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
