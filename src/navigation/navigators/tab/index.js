import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeStack from './home';
import DiningStack from './dining';
import MeetingStack from './meeting';
import MapsStack from './maps';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { Screen, Color } from '@api/localization';

const MainTabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    DiningStack,
    MeetingStack,
    MapsStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'HomeStack') {
          iconName = require('@assets/bottomBar/home.png');
          activeColor = Color.PRIMARY;
        } else if (routeName === 'DiningStack') {
          iconName = require('@assets/bottomBar/ic_dining.png');
          activeColor = '#24C6FF';
        } else if (routeName === 'MeetingStack') {
          iconName = require('@assets/bottomBar/ic_meeting.png');
          activeColor = Color.YELLOW;
        } else if (routeName === 'MapsStack') {
          iconName = require('@assets/bottomBar/ic_location.png');
          activeColor = Color.YELLOW;
        }

        return (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={focused ? { height: 30, width: 30, resizeMode: 'contain' } : { height: 25, width: 25, resizeMode: 'contain', opacity: 0.4 }}
              source={iconName}
              // tintColor={focused ? null : Color.GREY}
            />
          </View>
        );
      },
    }),
    tabBarOptions: {
      showLabel: false,
      style: {
        height: Screen.SCREEN_HEIGHT * 0.095,
      },
    },
  },
);

export default MainTabNavigator;
