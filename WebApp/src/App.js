import React from 'react';

import { AuthProvider } from './contexts/auth';
import Mainroutes from './main.routes';
import { Router } from 'react-router-dom';
import history from './history';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

function App() {
  return (
    <AuthProvider>
      <Router history={history}>
        <ToastContainer />
        <Mainroutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
