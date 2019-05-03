import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPagamento, defaultValue } from 'app/shared/model/pagamento.model';

export const ACTION_TYPES = {
  FETCH_PAGAMENTO_LIST: 'pagamento/FETCH_PAGAMENTO_LIST',
  FETCH_PAGAMENTO: 'pagamento/FETCH_PAGAMENTO',
  CREATE_PAGAMENTO: 'pagamento/CREATE_PAGAMENTO',
  UPDATE_PAGAMENTO: 'pagamento/UPDATE_PAGAMENTO',
  DELETE_PAGAMENTO: 'pagamento/DELETE_PAGAMENTO',
  RESET: 'pagamento/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPagamento>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PagamentoState = Readonly<typeof initialState>;

// Reducer

export default (state: PagamentoState = initialState, action): PagamentoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PAGAMENTO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PAGAMENTO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PAGAMENTO):
    case REQUEST(ACTION_TYPES.UPDATE_PAGAMENTO):
    case REQUEST(ACTION_TYPES.DELETE_PAGAMENTO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PAGAMENTO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PAGAMENTO):
    case FAILURE(ACTION_TYPES.CREATE_PAGAMENTO):
    case FAILURE(ACTION_TYPES.UPDATE_PAGAMENTO):
    case FAILURE(ACTION_TYPES.DELETE_PAGAMENTO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PAGAMENTO_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PAGAMENTO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PAGAMENTO):
    case SUCCESS(ACTION_TYPES.UPDATE_PAGAMENTO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PAGAMENTO):
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

const apiUrl = 'api/pagamentos';

// Actions

export const getEntities: ICrudGetAllAction<IPagamento> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PAGAMENTO_LIST,
    payload: axios.get<IPagamento>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IPagamento> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PAGAMENTO,
    payload: axios.get<IPagamento>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPagamento> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PAGAMENTO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPagamento> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PAGAMENTO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPagamento> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PAGAMENTO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
