import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProprietario, defaultValue } from 'app/shared/model/proprietario.model';

export const ACTION_TYPES = {
  FETCH_PROPRIETARIO_LIST: 'proprietario/FETCH_PROPRIETARIO_LIST',
  FETCH_PROPRIETARIO: 'proprietario/FETCH_PROPRIETARIO',
  CREATE_PROPRIETARIO: 'proprietario/CREATE_PROPRIETARIO',
  UPDATE_PROPRIETARIO: 'proprietario/UPDATE_PROPRIETARIO',
  DELETE_PROPRIETARIO: 'proprietario/DELETE_PROPRIETARIO',
  RESET: 'proprietario/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProprietario>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ProprietarioState = Readonly<typeof initialState>;

// Reducer

export default (state: ProprietarioState = initialState, action): ProprietarioState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROPRIETARIO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROPRIETARIO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PROPRIETARIO):
    case REQUEST(ACTION_TYPES.UPDATE_PROPRIETARIO):
    case REQUEST(ACTION_TYPES.DELETE_PROPRIETARIO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PROPRIETARIO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROPRIETARIO):
    case FAILURE(ACTION_TYPES.CREATE_PROPRIETARIO):
    case FAILURE(ACTION_TYPES.UPDATE_PROPRIETARIO):
    case FAILURE(ACTION_TYPES.DELETE_PROPRIETARIO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROPRIETARIO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROPRIETARIO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROPRIETARIO):
    case SUCCESS(ACTION_TYPES.UPDATE_PROPRIETARIO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROPRIETARIO):
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

const apiUrl = 'api/proprietarios';

// Actions

export const getEntities: ICrudGetAllAction<IProprietario> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PROPRIETARIO_LIST,
  payload: axios.get<IProprietario>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IProprietario> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROPRIETARIO,
    payload: axios.get<IProprietario>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IProprietario> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROPRIETARIO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProprietario> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROPRIETARIO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProprietario> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROPRIETARIO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
