import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

//Socket.io
import { baseUrl } from "./config/config";
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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App socket={socket}/>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
