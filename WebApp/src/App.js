import React from "react";

import { AuthProvider } from "./contexts/auth";
import Mainroutes from "./main.routes";
import { Router } from "react-router-dom";
import history from "./history";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import { MobileAppProvider } from "./mobile/contexts/app";
/// get something now
function App() {
  return (
    <AuthProvider>
      <MobileAppProvider>
        <Router history={history}>
          <ToastContainer />
          <Mainroutes />
        </Router>
      </MobileAppProvider>
    </AuthProvider>
  );
}

export default App;
