import React, {useContext} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import Input from './Input'
import {createMessage} from '../../store/create'
import { chatInfo } from '../../store/currentChat'
import SocketContext from '../../socketContext'

export default function InputContainer() {
  const socket = useContext(SocketContext)
  const dispatch = useDispatch();
  const token = useSelector(state => state.authentication.token)

  const chat = useSelector(state => state.chatMessages.chat);
  const userId = useSelector(state => state.user.user.id);
  const chatId = chat.id;
  const chatType = chat.ownerId ? 'channels' : 'groups';
  const createMessageProp= async (message) => {
    /////socket emmit here.--- comment the create Message dispatch
    await socket.emit(`channel${chatId}`, {userId, message, channelId: chatId })
    // const body = {userId, chatId, chatType, message}
    // await dispatch(createMessage(body, token))
    // await dispatch(chatInfo(token, chatType, chatId))
  };

  const dispatchFunctions= {createMessageProp};
  const props ={dispatchFunctions};

  if(!props) return null;

  return (
    <>
      <Input props={props} />
    </>
  )
}
