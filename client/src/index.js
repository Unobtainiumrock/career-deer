// Vendor
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// Updated import for service worker registration (if needed)
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
// Updated import for the ThemeProvider and theme creation function
import { ThemeProvider, createTheme } from '@mui/material/styles';
// This gives our app access to the store
import { Provider } from 'react-redux';

// Core app
import App from './containers/App/App';

// Import our store configuration.
import configureStore from './configureStore';

// We need to determine what we want the initial state of the application to be.
import initialState from './initialState';

const store = configureStore(initialState);
const MOUNT_NODE = document.getElementById('root');

// Create a basic theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    // You can add more theme properties here
  },
});

const root = ReactDOM.createRoot(MOUNT_NODE)

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you're using service workers, register it here.
// If you have updated to the newer service worker setup, use serviceWorkerRegistration
serviceWorkerRegistration.unregister(); // Or register() if you want to enable it
