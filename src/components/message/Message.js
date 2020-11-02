import React from 'react'
import PersonIcon from '@material-ui/icons/Person';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import RoomIcon from '@material-ui/icons/Room';

import './Message.css'

export default function Message({ props }) {
  // return (
  //   <div>
  //       {props.messages.map((message, i) => {
  //         return <h3 key={i} >{message.message}</h3>
  //       })}
  //   </div>
  // )

  const handleMessage= (id, type) => {
    // console.log(`${type}...${id}`)
    props.dispatchFunctionProps.updateMessageProp(id, type)
    props.dispatchFunctionProps.updateChatProp()
  };

  return (
    <div>
      {props.messages.map((message, i) => {
        return(
          <div key={`messageContainerDiv${i}`} className='individualMessageContainer'>
            <div key={`avatarContainer${i}`} className='individualAvatarContainer'>
              {message.User.avatarUrl? <Avatar src={message.User.avatarUrl} /> : <PersonIcon fontSize='large' />}
            </div>
            <div key={`rightDiv${i}`} className='individualRightContainer'>
              <div className='messageTopBar' key={`messageTopBar${i}`}>
                {message.User.userName ? <div className='messageAuthor' key={`name${i}`}>{message.User.userName}</div> :<div className='messageAuthor' key={`name${i}`}>{message.User.firstName}</div>}
                <div>
                  {props.user.user.id === message.userId ? <Button key={`options${i}`} onClick={() => handleMessage(message.id, 'delete')}><DeleteIcon fontSize='small' /></Button> : null}
                  {message.pinned ? <Button onClick={() => handleMessage(message.id, 'pin')}><RoomIcon className={'pinned'} /></Button> : <Button onClick={() => handleMessage(message.id, 'pin')}><RoomIcon /></Button>}
                </div>
              </div>
              <div key={i} >{message.message}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
