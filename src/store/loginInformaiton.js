import { baseUrl } from '../config/config';
import { TOKEN_KEY } from './authentication'

export const REMOVE_TOKEN = 'slack/authentication/REMOVE_TOKEN';
export const LOGIN_INFO = 'slack/loginInformation/LOGIN_INFO';
export const UPDATE_USER = 'slack/loginInformation/UPDATE_USER';
export const DELETE_USER = 'slack/loginInformation/DELETE+USER';



export const loadInformation = userInfo => ({ type: LOGIN_INFO, userInfo })
export const updateUser = () => ({ type: UPDATE_USER })
export const deleteUser = () => ({ type: DELETE_USER })

export const userInfo = (token) => async dispatch => {
  // console.log(`token---------${token}`)
  const response = await fetch(`${baseUrl}/users/userInfo`, {
    method: 'get',
    headers: { Authorization: `Bearer ${token}` },
  });
  if(response.ok){
    const userInfo = await response.json();
    // console.log(userInfo)
    dispatch(loadInformation(userInfo));
  }
}

export const updateAccount = (token, userInfo) => async (dispatch) => {
  const response = await fetch(`${baseUrl}/users`, {
    method: "put",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json"},
    body: JSON.stringify(userInfo),
  });

  if(response.ok){
    dispatch(updateUser())
    window.location.href = '/'
  }
}

export const deleteAccount = token => async dispatch => {
  const response = await fetch(`${baseUrl}/users`, {
    method: "delete",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json"},
  })
  if(response.ok){
    dispatch(deleteUser())
    window.localStorage.removeItem(TOKEN_KEY);
    window.location.href = '/'
  }
}

export default function reducer(state ={}, action) {
  switch (action.type){
    case LOGIN_INFO: {
      return {
        ...state,
        ...action.userInfo
      }
    }
    case UPDATE_USER: {
      return{
        ...state
      }
    }
    case REMOVE_TOKEN: {
      return {}
    }
    case DELETE_USER: {
      return {}
    }
    default: return state;
  }
}
