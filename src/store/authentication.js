import { baseUrl } from '../config/config';
import { DELETE_USER } from './loginInformaiton'

export const TOKEN_KEY = 'slack/authentication/token';
export const SET_TOKEN = 'slack/authentication/SET_TOKEN';
export const REMOVE_TOKEN = 'slack/authentication/REMOVE_TOKEN';

export const removeToken = token => ({ type: REMOVE_TOKEN });
export const setToken = token => ({ type: SET_TOKEN, token });

export const loadToken = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN_KEY);
  if (token) {
    dispatch(setToken(token));
  }
};

export const signUp = user => async dispatch => {
  const response = await fetch(`${baseUrl}/users`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  if (response.ok) {
    const res = await response.json();
    const token = res.token;
    window.localStorage.setItem(TOKEN_KEY, token);
    dispatch(setToken(token));
  }
}

export const login = (email, password) => async dispatch => {
  const response = await fetch(`${baseUrl}/session`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const { token } = await response.json();
    window.localStorage.setItem(TOKEN_KEY, token);
    dispatch(setToken(token));
  }
};

export const logout = () => async (dispatch, getState) => {
  const { authentication: { token } } = getState();
  const response = await fetch(`${baseUrl}/session`, {
    method: 'delete',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.ok) {
    window.localStorage.removeItem(TOKEN_KEY);
    dispatch(removeToken());
  }
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_TOKEN: {
      return {
        ...state,
        token: action.token,
      };
    }
    case REMOVE_TOKEN: {
      const newState = { ...state };
      delete newState.token;
      return newState;
    }
    case DELETE_USER: {
      return {}
    }
    default: return state;
  }
}
