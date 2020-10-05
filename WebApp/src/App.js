import React from 'react';

import Mainroutes from './main.routes';
import { Router } from 'react-router-dom';
import history from './history';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

import { AuthProvider } from './contexts/auth';
import { EmpresaProvider } from './contexts/empresa';
/// get something now
function App() {
  return (
    <AuthProvider>
      <Router history={history}>
        <ToastContainer />
        <EmpresaProvider>
          <Mainroutes />
        </EmpresaProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
