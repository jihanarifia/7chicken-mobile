import React from 'react';
import { Image } from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import Category from '@features/category/containers';
import DetailCategory from '@features/category/containers/detail';

const CategoryStack = createStackNavigator(
  {
    Category: {
      screen: Category,
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
    DetailCategory: {
      screen: DetailCategory,
    },
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
  },
);

CategoryStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

export default CategoryStack;
