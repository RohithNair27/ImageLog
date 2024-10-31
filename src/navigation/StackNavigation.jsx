import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Signup from '../Screens/Signup';
import LandingPage from '../Screens/LandingPage';
import Login from '../Screens/Login';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigation';
const StackNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={styles.body}>
      <Stack.Screen name="LandingPage" component={LandingPage} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({
  body: {
    headerShown: false,
  },
});
