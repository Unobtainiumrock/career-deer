// Vendor
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
// Updated import for the ThemeProvider and theme creation function
import { ThemeProvider, createTheme } from '@mui/material/styles';
// This gives our app access to the store
import { Provider } from 'react-redux';

// Core app
import App from './containers/App/App';

// Import our store configuration.
// We've extracted the logic into a configureStore.js
// file to keep this index.js cleaner and more focused on
// what it needs to be concerned with.
import configureStore from './configureStore';

// We need to determine what we want the initial state of
// the application to be.
import initialState from './initialState';

const store = configureStore(initialState);
const MOUNT_NODE = document.querySelector('#root');

// Create a basic theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    // You can add more theme properties here
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  MOUNT_NODE
);

registerServiceWorker();
