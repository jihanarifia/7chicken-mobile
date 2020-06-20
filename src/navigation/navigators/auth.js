 
import { createStackNavigator } from 'react-navigation-stack';
import Login from '@features/auth/containers';

const AuthNavigator = createStackNavigator(
  {
    Login: Login
  },
  {
    headerMode: 'none',
  },
);

export default AuthNavigator;