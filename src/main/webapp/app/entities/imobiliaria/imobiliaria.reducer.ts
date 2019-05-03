import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IImobiliaria, defaultValue } from 'app/shared/model/imobiliaria.model';

export const ACTION_TYPES = {
  FETCH_IMOBILIARIA_LIST: 'imobiliaria/FETCH_IMOBILIARIA_LIST',
  FETCH_IMOBILIARIA: 'imobiliaria/FETCH_IMOBILIARIA',
  CREATE_IMOBILIARIA: 'imobiliaria/CREATE_IMOBILIARIA',
  UPDATE_IMOBILIARIA: 'imobiliaria/UPDATE_IMOBILIARIA',
  DELETE_IMOBILIARIA: 'imobiliaria/DELETE_IMOBILIARIA',
  RESET: 'imobiliaria/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IImobiliaria>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ImobiliariaState = Readonly<typeof initialState>;

// Reducer

export default (state: ImobiliariaState = initialState, action): ImobiliariaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_IMOBILIARIA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_IMOBILIARIA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_IMOBILIARIA):
    case REQUEST(ACTION_TYPES.UPDATE_IMOBILIARIA):
    case REQUEST(ACTION_TYPES.DELETE_IMOBILIARIA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_IMOBILIARIA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_IMOBILIARIA):
    case FAILURE(ACTION_TYPES.CREATE_IMOBILIARIA):
    case FAILURE(ACTION_TYPES.UPDATE_IMOBILIARIA):
    case FAILURE(ACTION_TYPES.DELETE_IMOBILIARIA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_IMOBILIARIA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_IMOBILIARIA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_IMOBILIARIA):
    case SUCCESS(ACTION_TYPES.UPDATE_IMOBILIARIA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_IMOBILIARIA):
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

const apiUrl = 'api/imobiliarias';

// Actions

export const getEntities: ICrudGetAllAction<IImobiliaria> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_IMOBILIARIA_LIST,
  payload: axios.get<IImobiliaria>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IImobiliaria> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_IMOBILIARIA,
    payload: axios.get<IImobiliaria>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IImobiliaria> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_IMOBILIARIA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IImobiliaria> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_IMOBILIARIA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IImobiliaria> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_IMOBILIARIA,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
