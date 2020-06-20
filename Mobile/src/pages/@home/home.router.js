import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Home from './oportunities';
import HomeDetails from './home.details';

const Stack = createStackNavigator();

const HomeRouter = ({ navigation, route }) => {
  if (route.state) {
    navigation.setOptions({
      tabBarVisible: route.state.index > 0 ? false : true,
    });
  }

  return (
    <Stack.Navigator initialRouteName="Home" mode="modal">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={HomeDetails}
        options={{ animationEnabled: true, headerShown: false }}
      />
      <Stack.Screen name="Settingss" component={Home} />
    </Stack.Navigator>
  );
};

export default HomeRouter;
