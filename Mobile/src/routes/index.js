/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import { useAuth } from '~/contexts/auth';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

const Routes = () => {
  const { signed, loading } = useAuth();

  // if (loading) {
  //   return (
  // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //   <ActivityIndicator size="large" color="#0186ae" />
  // </View>
  //   );
  // }
  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
