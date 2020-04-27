/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
/** Screens **/
import Home from '~/pages/@home/home.router';
import Settings from '../@settings/settings.routes';
import Notifications from '~/pages/@notifications';

import { tabBarOptions, ICON_SIZE } from './tabs.config';
import AddButton from '../addButton';
import { View } from 'react-native';

const Tab = createBottomTabNavigator();

const BottomTabs = () => (
  <Tab.Navigator tabBarOptions={tabBarOptions}>
    <Tab.Screen
      name="Discover"
      options={{
        tabBarIcon: ({ color }) => {
          // console.log(e);
          return <Icon name="explore" size={ICON_SIZE} color={color} />;
        },
      }}
      component={Home}
    />
    <Tab.Screen
      name="Details"
      options={{
        tabBarIcon: ({ color }) => (
          <Icon name="notifications" size={ICON_SIZE} color={color} />
        ),
      }}
      component={Home}
    />
    <Tab.Screen
      name="AddButton"
      listeners={false}
      options={{
        tabBarLabel: '',
        tabBarIcon: () => <AddButton />,
      }}
      component={View}
    />
    <Tab.Screen
      name="Notifications"
      options={{
        tabBarIcon: ({ color }) => (
          <Icon name="notifications" size={ICON_SIZE} color={color} />
        ),
      }}
      component={Notifications}
    />
    <Tab.Screen
      name="Settings"
      options={{
        tabBarIcon: ({ color }) => (
          <Icon name="settings" size={ICON_SIZE} color={color} />
        ),
      }}
      component={Settings}
    />
  </Tab.Navigator>
);

export default BottomTabs;
