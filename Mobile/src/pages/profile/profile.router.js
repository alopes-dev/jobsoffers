import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import IndexProfile from './index';
import ProfileEditing from './profileEditing';
import ProfileInfo from './profileInfo';

const Stack = createStackNavigator();

const ProfileRouter = ({ navigation, route }) => {
  if (route.state) {
    navigation.setOptions({
      tabBarVisible: route.state.index > 0 ? false : true,
    });
  }

  return (
    <Stack.Navigator initialRouteName="Profile" mode="modal">
      <Stack.Screen
        name="Profile"
        component={IndexProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileEditing"
        component={ProfileEditing}
        options={{
          title: 'Adicionar Informação Curricular',
          headerStyle: {
            backgroundColor: '#0186ae',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '400',
            fontSize: 18,
          },
        }}
        // options={{ animationEnabled: true, headerShown: false }}
      />
      <Stack.Screen
        name="ProfileInfo"
        component={ProfileInfo}
        options={{
          title: 'Informação Curricular',
          headerStyle: {
            backgroundColor: '#0186ae',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '400',
            fontSize: 18,
          },
        }}
        // options={{ animationEnabled: true, headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ProfileRouter;
