/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import BottomTabs from '~/pages/@bottom-tabs';
import { useAuth } from '~/contexts/auth';

const AppRoutes = () => {
  return (
    <AppStack.Navigator headerMode="none">
      <AppStack.Screen name="main" component={BottomTabs} />
    </AppStack.Navigator>
  );
};

export default AppRoutes;
