import {NavigationActions} from 'react-navigation';
import AStorage from '@api/asyncStorage';

let _navigator;

const setTopLevelNavigator = navigatorRef => {
  _navigator = navigatorRef;
};

const navigate = (routeName, params) => {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
};

const checkLogin = () => {
  AStorage.getItem('userData')
    .then(val => {
      return true;
    })
    .catch(error => {
      return false;
    });
};

export default {
  navigate,
  setTopLevelNavigator,
  checkLogin,
};
