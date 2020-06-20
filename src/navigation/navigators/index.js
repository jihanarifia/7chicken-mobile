import MainTabNavigator from './tab';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthNavigator from './auth';

const AppSwitchNavigator = createSwitchNavigator({
    Auth: { screen: AuthNavigator },
    Main: { screen: MainTabNavigator },
});
const appNavigator = createAppContainer(AppSwitchNavigator);


export default appNavigator;