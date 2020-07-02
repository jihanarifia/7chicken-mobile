import MainTabNavigator from './tab';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthNavigator from './auth';

const AppSwitchNavigator = createSwitchNavigator({
    Main: { screen: MainTabNavigator },
    Auth: { screen: AuthNavigator },
});
const appNavigator = createAppContainer(AppSwitchNavigator);


export default appNavigator;