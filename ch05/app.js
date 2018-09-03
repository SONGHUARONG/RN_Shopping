/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {
  Component
} from 'react';
import {
  View,
  Platform

} from 'react-native';

import {
  Navigator
} from 'react-native-deprecated-custom-components';

import Home from './home';

import Main from './main';

export default class App extends Component {

  render() {
    return (< Navigator initialRoute={
      {
        // name: 'home',
        // component: Home
        name: 'main',
        component: Main
      }
    }
      configureScene={
        (route) => {
          return Navigator.SceneConfigs.FloatFromRight;
        }
      }
      renderScene={
        (route, navigator) => {
          const Component = route.component;
          return <Component {...route.params}
            navigator={
              navigator
            }
          />
        }
      }

    />);
  }

}