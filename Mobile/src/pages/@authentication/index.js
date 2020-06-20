import React from 'react';
import { View, Text } from 'react-native';
import { AuthScreenProvider } from '~/contexts/auth.screen';
import AuthenticationScreen from './auth.screen';

const Authentication = () => {
  return (
    <AuthScreenProvider>
      <AuthenticationScreen />
    </AuthScreenProvider>
  );
};

export default Authentication;
