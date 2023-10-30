import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Login from '../Screens/Login';
import Attendance from '../Screens/Attendance';
import PictureView from '../Screens/PictureView';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const StackNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={styles.body}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Attendance" component={Attendance} />
      <Stack.Screen name="PictureView" component={PictureView} />
    </Stack.Navigator>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({
  body: {
    headerShown: false,
  },
});
