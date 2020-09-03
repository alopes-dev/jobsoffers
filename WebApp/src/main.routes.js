import React from "react";

import MainLayout from "./components/Layout/MainLayout";
import AuthLayout from "./components/Layout/AuthLayout";

import { useAuth } from "./contexts/auth";

import { Loading } from "./style";

export default function Mainroutes() {
  const { signed, loading } = useAuth();

  if (loading) {
    return (
      <Loading>
        <a className="logo" style={{ marginTop: "-160px" }}>
          <img
            src="./img/jobsNoBackGround.png"
            alt="navbar brand"
            className="navbar-brand"
            style={{ height: "100%" }}
          />
        </a>
        <div id="preloader_1">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </Loading>
    );
  }

  return !signed ? <MainLayout /> : <AuthLayout />;
}
