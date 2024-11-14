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
import { BrowserRouter as Router } from 'react-router-dom';

// Core app
import App from './containers/App/App';

// Wrap App component in error boundary component to catch unexpected errors.
import ErrorBoundary from './containers/ErrorBoundary/ErrorBoundary';

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
    }
  }
});

const root = ReactDOM.createRoot(MOUNT_NODE)

root.render(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </Router>
      </Provider>
    </ThemeProvider>
);

// If you're using service workers, register it here.
// If you have updated to the newer service worker setup, use serviceWorkerRegistration
serviceWorkerRegistration.unregister(); // Or register() if you want to enable it
