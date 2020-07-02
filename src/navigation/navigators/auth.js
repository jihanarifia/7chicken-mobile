
import { createStackNavigator } from 'react-navigation-stack';
import Login from '@features/auth/containers';
import ForgotPassword from '@features/auth/containers/forgotPassword';
import Register from '../../features/auth/containers/register';
import OTP from '../../features/auth/containers/otp';

const AuthNavigator = createStackNavigator(
  {
    Login: Login,
    ForgotPassword: ForgotPassword,
    Register: Register,
    OTP: OTP,
  },
  {
    headerMode: 'none',
  },
);

export default AuthNavigator;