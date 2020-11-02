import { baseUrl } from '../config/config';

export const CREATE_CHANNEL = 'slack/create/CREATE_CHANNEL'

const updateChannel = () => ({ type: CREATE_CHANNEL })

export const createChannel = (token, body) => async dispatch => {
  const response = await fetch(`${baseUrl}/channels`, {
    method: 'post',
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json"},
    body: JSON.stringify(body)
  })
  if(response.ok){
    // dispatch(updateChannel())
  }
}
export const createGroup= (body, token) => async dispatch => {
  const name = body.name;
  const userId = body.userId;
  // console.log(name)
  // console.log(userId)
  const response = await fetch(`${baseUrl}/groups/${userId}`, {
    method: 'post',
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json"},
    body: JSON.stringify({name: name})
  })
  if(response.ok){
    // dispatch
  }
}
export const createMessage = (body, token) => async dispatch => {
  const chatType = body.chatType;
  const chatId = body.chatId;
  const message = body.message;
  // console.log(message)
  const response = await fetch(`${baseUrl}/${chatType}/${chatId}/message`, {
    method: 'post',
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json"},
    body: JSON.stringify({message: message})
  })
}
export const updateMessage = (id, type, token) => async dispatch =>{
  const method = type === 'delete' ? 'delete' : 'put';
  const response = await fetch(`${baseUrl}/messages/${id}`, {
    method: method,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json"},
  })
}
export const createFriend = (token, body) => async dispatch => {
  const response = await fetch(`${baseUrl}/users/makeFriendWithEmail`, {
    method: 'post',
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json"},
    body: JSON.stringify(body)
  })
  if(response.ok){
    // console.log(response.json())
  }

}

export default function reducer(state = {}, action){
  switch(action.type){
    case CREATE_CHANNEL: {
      return{
        ...state,
      }
    }
    default: return state;
  }
}
