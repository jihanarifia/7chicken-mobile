import React from 'react';
import { Image } from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import Setting from '@features/setting/containers';
import {strings, Color} from '@api/localization';

const SettingStack = createStackNavigator(
  {
    Setting: {
      screen: Setting,
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
    }
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
  },
);

SettingStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

export default SettingStack;
