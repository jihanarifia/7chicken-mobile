
import { createStackNavigator } from 'react-navigation-stack';
import Login from '@features/auth/containers';
import ForgotPassword from '@features/auth/containers/forgotPassword';

const AuthNavigator = createStackNavigator(
  {
    Login: Login,
    ForgotPassword: ForgotPassword,
  },
  {
    headerMode: 'none',
  },
);

export default AuthNavigator;