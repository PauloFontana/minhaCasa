import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IVisita, defaultValue } from 'app/shared/model/visita.model';

export const ACTION_TYPES = {
  FETCH_VISITA_LIST: 'visita/FETCH_VISITA_LIST',
  FETCH_VISITA: 'visita/FETCH_VISITA',
  CREATE_VISITA: 'visita/CREATE_VISITA',
  UPDATE_VISITA: 'visita/UPDATE_VISITA',
  DELETE_VISITA: 'visita/DELETE_VISITA',
  SET_BLOB: 'visita/SET_BLOB',
  RESET: 'visita/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IVisita>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type VisitaState = Readonly<typeof initialState>;

// Reducer

export default (state: VisitaState = initialState, action): VisitaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_VISITA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_VISITA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_VISITA):
    case REQUEST(ACTION_TYPES.UPDATE_VISITA):
    case REQUEST(ACTION_TYPES.DELETE_VISITA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_VISITA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_VISITA):
    case FAILURE(ACTION_TYPES.CREATE_VISITA):
    case FAILURE(ACTION_TYPES.UPDATE_VISITA):
    case FAILURE(ACTION_TYPES.DELETE_VISITA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_VISITA_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_VISITA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_VISITA):
    case SUCCESS(ACTION_TYPES.UPDATE_VISITA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_VISITA):
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

const apiUrl = 'api/visitas';

// Actions

export const getEntities: ICrudGetAllAction<IVisita> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_VISITA_LIST,
    payload: axios.get<IVisita>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IVisita> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_VISITA,
    payload: axios.get<IVisita>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IVisita> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_VISITA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IVisita> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_VISITA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IVisita> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_VISITA,
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
