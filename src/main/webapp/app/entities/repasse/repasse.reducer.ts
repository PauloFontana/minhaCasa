import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IRepasse, defaultValue } from 'app/shared/model/repasse.model';

export const ACTION_TYPES = {
  FETCH_REPASSE_LIST: 'repasse/FETCH_REPASSE_LIST',
  FETCH_REPASSE: 'repasse/FETCH_REPASSE',
  CREATE_REPASSE: 'repasse/CREATE_REPASSE',
  UPDATE_REPASSE: 'repasse/UPDATE_REPASSE',
  DELETE_REPASSE: 'repasse/DELETE_REPASSE',
  RESET: 'repasse/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IRepasse>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type RepasseState = Readonly<typeof initialState>;

// Reducer

export default (state: RepasseState = initialState, action): RepasseState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_REPASSE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_REPASSE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_REPASSE):
    case REQUEST(ACTION_TYPES.UPDATE_REPASSE):
    case REQUEST(ACTION_TYPES.DELETE_REPASSE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_REPASSE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_REPASSE):
    case FAILURE(ACTION_TYPES.CREATE_REPASSE):
    case FAILURE(ACTION_TYPES.UPDATE_REPASSE):
    case FAILURE(ACTION_TYPES.DELETE_REPASSE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_REPASSE_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_REPASSE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_REPASSE):
    case SUCCESS(ACTION_TYPES.UPDATE_REPASSE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_REPASSE):
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

const apiUrl = 'api/repasses';

// Actions

export const getEntities: ICrudGetAllAction<IRepasse> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_REPASSE_LIST,
    payload: axios.get<IRepasse>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IRepasse> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_REPASSE,
    payload: axios.get<IRepasse>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IRepasse> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_REPASSE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IRepasse> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_REPASSE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IRepasse> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_REPASSE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
