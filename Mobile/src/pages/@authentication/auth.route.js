/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const AuthStack = createStackNavigator();

import Authentication from './index';

const AuthStackRoutes = () => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen
      name="Auth"
      component={Authentication}
      options={{ title: 'Sign In' }}
    />
  </AuthStack.Navigator>
);

export default AuthStackRoutes;
