import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { Icon } from 'native-base';
import { Image } from 'react-native';
import Home from '@features/home/containers';
import Profile from '@features/home/containers/profile';
import { Color, strings, Font } from '@api/localization';

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => {
        const { params = {} } = navigation.state; 
        return {
          headerTitle: (
            <Image
              style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                height: 45,
                width: 75,
                resizeMode: 'contain',
                alignItems: 'center'
              }}
              source={require('@assets/logo.png')}
            />
          ),
          headerStyle: { elevation: 0, shadowOpacity: 0, borderBottomWidth: 0 },
        };
      },
    },
    Profile: {
      screen: Profile,
    },
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
  },
);

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

export default HomeStack;
