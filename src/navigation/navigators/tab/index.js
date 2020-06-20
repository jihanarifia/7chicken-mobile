import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeStack from './home';
import CategoryStack from './category';
import SettingStack from './setting';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { Screen, Color } from '@api/localization';

const MainTabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    CategoryStack,
    SettingStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'HomeStack') {
          iconName = require('@assets/bottomBar/home.png');
          activeColor = Color.PRIMARY;
        } else if (routeName === 'CategoryStack') {
          iconName = require('@assets/bottomBar/ic_store.png');
          activeColor = '#24C6FF';
        }else if (routeName === 'SettingStack') {
          iconName = require('@assets/bottomBar/ic_voucher.png');
          activeColor = Color.YELLOW;
        }

        return (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={{ height: 22, width: 22, resizeMode: 'contain' }}
              source={iconName}
              tintColor={focused ? activeColor : Color.GREY}
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
