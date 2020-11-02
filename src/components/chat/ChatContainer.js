import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { userInfo } from '../../store/loginInformaiton'
import { leaveChat, deleteChannel } from '../../store/currentChat'
import InputContainer from '../input/InputContainer'
import Chat from './Chat';

export default function ChatContainer() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.authentication.token)


  const leaveChatProp = ( userId, chatId, chatType) => {
    // console.log(userId, chatId, chatType)
    dispatch(leaveChat(userId, chatId, chatType, token))
    dispatch(userInfo(token))
  }
  const deleteChannelProp = (channelId) => {
    dispatch(deleteChannel(channelId, token))
    dispatch(userInfo(token))
  }

  const chat = useSelector(state => state.chatMessages)
  const currentUser = useSelector(state => state.user.user.id)
  const dispatchFunctions = {deleteChannelProp, leaveChatProp}
  const props ={currentUser, ...chat, dispatchFunctions}

  if(!props.chat) return <h1 className='splashText'>Dunegons<br/>&<br/>Slack</h1>
  return (
    <>
      <Chat props={props} />
      <InputContainer />
    </>
  )
}
