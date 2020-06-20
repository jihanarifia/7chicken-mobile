import React, { Component } from 'react';
import ApplicationNavigator from './navigators';
import NavigationService from '@api/navigation';

class App extends Component {
  render() {
    return (
      <ApplicationNavigator
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}

export default App;
