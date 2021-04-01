import React, { useState, useEffect } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import SplashContainer from './components/splash/SplashContainer';
import Splash from './components/Splash';
import HomePageContainer from './components/home/HomePageContainer';
import ProtectedRoute from './components/ProtectedRoute';
import { loadToken } from './store/authentication';
import { useSelector, useDispatch } from 'react-redux';
import ProfileContainer from './components/profile/ProfileContainer'
import { joinChannel } from './store/joinedChannels'
import SocketContext from './socketContext'
import { pushMessage } from './store/currentChat'
import { chatInfo } from './store/currentChat'
import useAsyncEffect from 'use-async-effect'
import './index.css'

const App = ({ socket }) => {
  const token = useSelector(state => state.authentication.token);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoaded(true);
    dispatch(loadToken());

  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //SOCKET FOR CHATS
  const currentChannel = useSelector(state => state.chatMessages.chat);
  const currentMessages = useSelector(state => state.chatMessages.messages)
  const joinedChannels = useSelector(state => state.joinedChannels);
  const chatState = useSelector(state => state.chatMessages)

  useEffect(() => {
    if (currentChannel) {
      // console.log(`Joining ${currentChannel.id}`);
      socket.emit('join', currentChannel.id);

    }
  },[currentChannel, socket]);

  useEffect(() => {
    if(!currentChannel) return;
    if (joinedChannels.includes(currentChannel.id)) return;
    console.log('joining channel --- whatever')
    const chatType = currentChannel.ownerId ? 'channels' : 'groups'
    socket.on(`channel${currentChannel.id}`, (newMessage) => {
      // console.log('are you even listening')

      dispatch(pushMessage(newMessage))
    })
    dispatch(joinChannel(currentChannel.id));
},[currentChannel, dispatch, joinedChannels, socket])//add a listen for joined Channels
  //SOCKET FOR CHATS
  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  if (!loaded) return null;
  return (
  <HashRouter>
    <SocketContext.Provider value={socket}>
        <Switch>
          <ProtectedRoute isLoggedIn={token} path='/' exact={ true } component={ HomePageContainer } />
          <ProtectedRoute isLoggedIn={token} path='/profile' exact={ true } component={ ProfileContainer } />
          <Route path='/*' exact={ true } component={ Splash } />
        </Switch>
    </SocketContext.Provider>
  </HashRouter>
  )
}


export default App;
