import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import Settings from './index';
import PersonalInformation from './settings.personalInfo';

const Stack = createStackNavigator();

const SettingsRoutes = ({ navigation, route }) => {
  if (route.state) {
    navigation.setOptions({
      tabBarVisible: route.state.index > 0 ? false : true,
    });
  }
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingsItems"
        component={Settings}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="PersonalInfo" component={PersonalInformation} />
    </Stack.Navigator>
  );
};

export default SettingsRoutes;
