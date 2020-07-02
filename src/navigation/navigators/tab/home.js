import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { Icon, Text } from 'native-base';
import { Image, TouchableWithoutFeedbackComponent, } from 'react-native';
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
          headerRight: (
              <Image
                style={{
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  height: 35,
                  width: 75,
                  resizeMode: 'contain',
                  alignItems: 'center'
                }}
                source={require('@assets/bottomBar/home.png')}
              />
            // <Icon
            //   onPress={() => this.props.navigation.goBack(null)}
            //   type='AntDesign' name="left"
            //   style={{ color: Color.PRIMARY, marginVertical: 20 }}
            // />
          ),
          headerStyle: { elevation: 0, shadowOpacity: 0, borderBottomWidth: 0, backgroundColor: Color.INTERMEDIATE },
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
