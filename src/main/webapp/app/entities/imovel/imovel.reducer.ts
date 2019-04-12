import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IImovel, defaultValue } from 'app/shared/model/imovel.model';

export const ACTION_TYPES = {
  FETCH_IMOVEL_LIST: 'imovel/FETCH_IMOVEL_LIST',
  FETCH_IMOVEL: 'imovel/FETCH_IMOVEL',
  CREATE_IMOVEL: 'imovel/CREATE_IMOVEL',
  UPDATE_IMOVEL: 'imovel/UPDATE_IMOVEL',
  DELETE_IMOVEL: 'imovel/DELETE_IMOVEL',
  RESET: 'imovel/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IImovel>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ImovelState = Readonly<typeof initialState>;

// Reducer

export default (state: ImovelState = initialState, action): ImovelState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_IMOVEL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_IMOVEL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_IMOVEL):
    case REQUEST(ACTION_TYPES.UPDATE_IMOVEL):
    case REQUEST(ACTION_TYPES.DELETE_IMOVEL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_IMOVEL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_IMOVEL):
    case FAILURE(ACTION_TYPES.CREATE_IMOVEL):
    case FAILURE(ACTION_TYPES.UPDATE_IMOVEL):
    case FAILURE(ACTION_TYPES.DELETE_IMOVEL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_IMOVEL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_IMOVEL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_IMOVEL):
    case SUCCESS(ACTION_TYPES.UPDATE_IMOVEL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_IMOVEL):
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

const apiUrl = 'api/imovels';

// Actions

export const getEntities: ICrudGetAllAction<IImovel> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_IMOVEL_LIST,
  payload: axios.get<IImovel>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IImovel> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_IMOVEL,
    payload: axios.get<IImovel>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IImovel> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_IMOVEL,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IImovel> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_IMOVEL,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IImovel> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_IMOVEL,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
