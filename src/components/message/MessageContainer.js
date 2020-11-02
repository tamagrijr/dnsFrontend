import React, {useEffect} from 'react'
import Message from './Message'
import { useDispatch, useSelector } from 'react-redux'

import { updateMessage } from '../../store/create'
import { chatInfo } from '../../store/currentChat'

export default function MessageContainer() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.authentication.token)
  const chatId = useSelector(state => state.chatMessages.chat.id)
  const chatOwnerId = useSelector(state => state.chatMessages.chat.ownerId)
  const chatType = chatOwnerId ? 'channels' : 'groups'

  const updateMessageProp = async (id, type) => {
    await dispatch(updateMessage(id, type, token))
    await dispatch(chatInfo(token, chatType, chatId))
  }
  const updateChatProp = () => {
    dispatch(chatInfo(token, chatType, chatId))
  }

  const messages = useSelector(state => state.chatMessages.messages)
  const user = useSelector(state => state.user)
  const dispatchFunctionProps = { updateMessageProp, updateChatProp }
  const props = { messages, user, dispatchFunctionProps }

  if(!props.messages) return null;

  return (
    <>
      <Message props={props} />
    </>
  )
}
