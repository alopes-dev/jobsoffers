import React, { Component } from 'react';
import '../../assets/css/costumized.css';
import Authentication from '../Auth/Authentication';

const AuthLayout = () => {
  document.querySelector('body').classList.add('bg-secondary-gradientn');
  return <Authentication />;
};

export default AuthLayout;
