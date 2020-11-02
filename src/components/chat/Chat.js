import React from 'react'
import ChatIcon from '@material-ui/icons/Chat';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import './Chat.css'

import Message from '../message/MessageContainer';

export default function Chat({ props }) {
  const handleLeave = () => {
    const userId = props.currentUser;
    const chatId = props.chat.id;
    let chatType;
    props.chat.ownerId ? chatType='channels' : chatType='groups';
    props.dispatchFunctions.leaveChatProp(userId, chatId, chatType);
  }
  const handleDelete = () => {
    const chatId = props.chat.id
    props.dispatchFunctions.deleteChannelProp(chatId)
  }
  return (
    <div className='chat'>
      <span className='topBar'>
        {props.chat.channelAvatar ? <Avatar src={props.chat.channelAvatar} /> : <ChatIcon />}
        <h1>{props.chat.name}</h1>
        {props.currentUser === props.chat.ownerId ? <Button onClick={handleDelete} >Delete</Button> : <Button onClick={handleLeave}>Leave</Button>}
      </span>

      <div className='messageContainer'>
        <div className='innerMessageContainer' >
          <Message />
        </div>
      </div>
    </div>
  )
}
