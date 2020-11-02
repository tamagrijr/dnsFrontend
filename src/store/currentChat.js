import { baseUrl } from '../config/config';
import { DELETE_USER } from './loginInformaiton'

const REMOVE_TOKEN = 'slack/authentication/REMOVE_TOKEN';
const CURRENT_CHAT = 'slack/currentChat/CURRENT_CHAT';
const CLEAR_CHAT = 'slack/currentChat/CLEAR_CHAT';
const ADD_MESSAGE = 'slack/currentChat/ADD_MESSAGE'

export const loadChat = (chatInfo, chat, returnMembers) => ({ type: CURRENT_CHAT, chatInfo, chat, returnMembers });
export const clearChat = () => ({ type: CLEAR_CHAT })
export const addMessage = (newMessage) =>({ type: ADD_MESSAGE, newMessage })

export const chatInfo = (token, chatType, chatId) => async dispatch => {
  const response = await fetch(`${baseUrl}/${chatType}/${chatId}/message`, {
    method: 'get',
    headers: { Authorization: `Bearer ${token}` },
  });

  const responseTwo = await fetch (`${baseUrl}/${chatType}/${chatId}`, {
    method: 'get',
    headers: { Authorization: `Bearer ${token}` },
  })

  const responseThree = await fetch (`${baseUrl}/${chatType}/${chatId}/members`, {
    method: 'get',
    headers: { Authorization: `Bearer ${token}` },
  })

    if(responseTwo.ok){
      const chat = await responseTwo.json();
      const chatInfo = await response.json();
      const members = await responseThree.json();
      const returnMembers = members.map(member => {
        return {id:member.User.id, firstName : member.User.firstName, lastName: member.User.lastName, userName: member.User.userName, avatarUrl: member.User.avatarUrl}
      })
      // console.log(returnMembers )
      dispatch(loadChat(chatInfo, chat, returnMembers))
  }

}

export const leaveChat = (userId, chatId, chatType, token) => async dispatch => {
  const response = await fetch(`${baseUrl}/${chatType}/${chatId}/${userId}`, {
    method: 'delete',
    headers: { Authorization: `Bearer ${token}` },
  })

  if(response.ok){
    dispatch(clearChat())
  }
}

export const deleteChannel = (channelId, token) => async dispatch => {
  const response = await fetch (`${baseUrl}/channels/${channelId}`, {
    method: 'delete',
    headers: { Authorization: `Bearer ${token}` },
  })
  if(response.ok){
    dispatch(clearChat())
  }
}

export const pushMessage = (newMessage) => async dispatch => {
  const response = await fetch (`${baseUrl}/users/${newMessage.userId}`, {
    method: 'get',
  })

  if(response.ok){
    const userInfo = await response.json()
    const dispatchedMessage = {...newMessage, User: userInfo}
    dispatch(addMessage(dispatchedMessage))
  }

}

export default function reducer(state ={}, action) {
  switch (action.type){
    case CURRENT_CHAT: {
      return {
        chat: action.chat,
        messages: [...action.chatInfo],
        members: action.returnMembers
      }
    }
    case ADD_MESSAGE: {
      return {
        chat: state.chat,
        messages: [...state.messages, action.newMessage],
        members: state.returnMembers
      }
    }
    case CLEAR_CHAT: {
      return {}
    }
    case REMOVE_TOKEN: {
      return {};
    }
    case DELETE_USER: {
      return {}
    }
    default: return state;
  }
}
