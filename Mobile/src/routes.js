/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthStackRoutes from '~/pages/@authentication/auth.route';
import BottomTabs from './pages/@bottom-tabs';

import { AuthProvider } from '~/contexts/auth';

const Stack = createStackNavigator();

const StackScreen = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="main" component={BottomTabs} />
    </Stack.Navigator>
  );
};
function Routes() {
  return (
    <NavigationContainer initialRouteName="Auth">
      <AuthProvider>
        {/* {state === true ? <AuthStackRoutes /> : <StackScreen />} */}
        {/* <StackScreen /> */}
        <AuthStackRoutes />
      </AuthProvider>
    </NavigationContainer>
  );
}

export default Routes;
