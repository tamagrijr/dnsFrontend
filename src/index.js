import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import CssBaseline from '@material-ui/core/CssBaseline';
import './index.css';

//Socket.io
import { socketUrl } from './config/config'
import io from "socket.io-client";
//Socket.io
const socket = io.connect(socketUrl);

socket.on('error', (error) => {
  console.error(error);
});
//Socket.io

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <CssBaseline />
        <App socket={socket}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
