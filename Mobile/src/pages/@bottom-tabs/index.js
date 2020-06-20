/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
/** Screens **/
import Home from '~/pages/@home/home.router';
import Settings from '../settings/settings.routes';
import Notifications from '~/pages/@notifications';

import { tabBarOptions, ICON_SIZE } from './tabs.config';
import Profile from '../profile';
import ProfileRouter from '../profile/profile.router';

const Tab = createBottomTabNavigator();

const BottomTabs = () => (
  <Tab.Navigator
    tabBarOptions={tabBarOptions}
    shifting={true}
    sceneAnimationEnabled={false}
  >
    <Tab.Screen
      name="Discover"
      options={{
        tabBarIcon: ({ color }) => {
          // console.log(e);
          return <AntDesign name="appstore-o" size={24} color={color} />;
        },
      }}
      component={Home}
    />
    <Tab.Screen
      name="Settings"
      options={{
        tabBarIcon: ({ color }) => (
          <AntDesign name="customerservice" size={25} color={color} />
        ),
      }}
      component={Settings}
    />

    <Tab.Screen
      name="Notifications"
      options={{
        tabBarIcon: ({ color }) => (
          <Icon
            name="ios-notifications-outline"
            size={ICON_SIZE}
            color={color}
          />
        ),
      }}
      component={Notifications}
    />
    <Tab.Screen
      name="Profile"
      options={{
        tabBarIcon: ({ color }) => (
          <SimpleLineIcons name="user" size={24} color={color} />
        ),
      }}
      component={ProfileRouter}
    />
  </Tab.Navigator>
);

export default BottomTabs;
