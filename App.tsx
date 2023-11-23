import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DataContextProvider from './src/context/DataContext/DataContextProvider';
import StackNavigation from './src/navigation/StackNavigation';
import {NavigationContainer} from '@react-navigation/native';
const App = () => {
  return (
    <DataContextProvider>
      <NavigationContainer>
        <StatusBar backgroundColor={'white'} />
        <StackNavigation />
      </NavigationContainer>
    </DataContextProvider>
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
