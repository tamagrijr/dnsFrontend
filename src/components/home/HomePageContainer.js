import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useAsyncEffect from 'use-async-effect'

import HomePage from './HomePage'
import { userInfo } from '../../store/loginInformaiton'
import { logout } from '../../store/authentication'
import { chatInfo } from '../../store/currentChat'
import { createChannel, createGroup, createFriend } from '../../store/create';

export default function HomeContainer() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.authentication.token)

  const logOut = () => {
    dispatch(logout())
  }
  const getChat = (chatType, chatId) => {
    dispatch(chatInfo(token, chatType, chatId))
  }
  const createChannelProp = (body) => {
    dispatch(createChannel(token, body))
  }
  const createFriendProp =(body) => {
    // console.log(body)
    dispatch(createFriend(token, body))
  }
  const createGroupProp =(body) => {
    dispatch(createGroup(body, token))
  }
  const reload = () => {
    dispatch(userInfo(token))
  }
  useAsyncEffect(() => {
    dispatch(userInfo(token))
  }, [])


  const user = useSelector(state => state.user)
  const dispatchFunctions = { logOut, getChat, createChannelProp, createGroupProp, createFriendProp, reload }
  const props = {user, dispatchFunctions}

  if(!props.user.friends) return (null)

  return (
    <>
      <HomePage props={props} />
    </>
  )
}
