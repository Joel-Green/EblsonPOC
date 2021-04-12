/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import RootStack from './src/navigators/RootStack';

const App = () => {
  return (
    <>
      <RootStack />
    </>
  );
};

export default App;
