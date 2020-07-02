
import { createStackNavigator } from 'react-navigation-stack';
import Login from '@features/auth/containers';
import ForgotPassword from '@features/auth/containers/forgotPassword';
import Register from '../../features/auth/containers/register';

const AuthNavigator = createStackNavigator(
  {
    Login: Login,
    ForgotPassword: ForgotPassword,
    Register: Register
  },
  {
    headerMode: 'none',
  },
);

export default AuthNavigator;