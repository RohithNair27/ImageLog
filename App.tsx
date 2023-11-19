import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import StackNavigation from './src/navigation/StackNavigation';
import {NavigationContainer} from '@react-navigation/native';
const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'white'} />
      <StackNavigation />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
  },
});
