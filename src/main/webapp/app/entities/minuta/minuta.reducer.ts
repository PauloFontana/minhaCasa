import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMinuta, defaultValue } from 'app/shared/model/minuta.model';

export const ACTION_TYPES = {
  FETCH_MINUTA_LIST: 'minuta/FETCH_MINUTA_LIST',
  FETCH_MINUTA: 'minuta/FETCH_MINUTA',
  CREATE_MINUTA: 'minuta/CREATE_MINUTA',
  UPDATE_MINUTA: 'minuta/UPDATE_MINUTA',
  DELETE_MINUTA: 'minuta/DELETE_MINUTA',
  SET_BLOB: 'minuta/SET_BLOB',
  RESET: 'minuta/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMinuta>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type MinutaState = Readonly<typeof initialState>;

// Reducer

export default (state: MinutaState = initialState, action): MinutaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MINUTA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MINUTA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_MINUTA):
    case REQUEST(ACTION_TYPES.UPDATE_MINUTA):
    case REQUEST(ACTION_TYPES.DELETE_MINUTA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_MINUTA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MINUTA):
    case FAILURE(ACTION_TYPES.CREATE_MINUTA):
    case FAILURE(ACTION_TYPES.UPDATE_MINUTA):
    case FAILURE(ACTION_TYPES.DELETE_MINUTA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_MINUTA_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_MINUTA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_MINUTA):
    case SUCCESS(ACTION_TYPES.UPDATE_MINUTA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_MINUTA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.SET_BLOB:
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType
        }
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/minutas';

// Actions

export const getEntities: ICrudGetAllAction<IMinuta> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_MINUTA_LIST,
    payload: axios.get<IMinuta>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IMinuta> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MINUTA,
    payload: axios.get<IMinuta>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IMinuta> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MINUTA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMinuta> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MINUTA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMinuta> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MINUTA,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType
  }
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
