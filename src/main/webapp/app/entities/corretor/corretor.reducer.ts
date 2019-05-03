import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICorretor, defaultValue } from 'app/shared/model/corretor.model';

export const ACTION_TYPES = {
  FETCH_CORRETOR_LIST: 'corretor/FETCH_CORRETOR_LIST',
  FETCH_CORRETOR: 'corretor/FETCH_CORRETOR',
  CREATE_CORRETOR: 'corretor/CREATE_CORRETOR',
  UPDATE_CORRETOR: 'corretor/UPDATE_CORRETOR',
  DELETE_CORRETOR: 'corretor/DELETE_CORRETOR',
  RESET: 'corretor/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICorretor>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type CorretorState = Readonly<typeof initialState>;

// Reducer

export default (state: CorretorState = initialState, action): CorretorState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CORRETOR_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CORRETOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CORRETOR):
    case REQUEST(ACTION_TYPES.UPDATE_CORRETOR):
    case REQUEST(ACTION_TYPES.DELETE_CORRETOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CORRETOR_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CORRETOR):
    case FAILURE(ACTION_TYPES.CREATE_CORRETOR):
    case FAILURE(ACTION_TYPES.UPDATE_CORRETOR):
    case FAILURE(ACTION_TYPES.DELETE_CORRETOR):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CORRETOR_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CORRETOR):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CORRETOR):
    case SUCCESS(ACTION_TYPES.UPDATE_CORRETOR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CORRETOR):
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

const apiUrl = 'api/corretors';

// Actions

export const getEntities: ICrudGetAllAction<ICorretor> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CORRETOR_LIST,
  payload: axios.get<ICorretor>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICorretor> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CORRETOR,
    payload: axios.get<ICorretor>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICorretor> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CORRETOR,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICorretor> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CORRETOR,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICorretor> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CORRETOR,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
