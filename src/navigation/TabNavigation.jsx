import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Attendance from '../Screens/Attendance';
import LoginList from '../Screens/LoginList';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          elevation: 0,
          borderColor: 'transparent',
        },
        tabBarIconStyle: {display: 'none'},
        tabBarItemStyle: {alignContent: 'center', justifyContent: 'center'},
        tabBarLabelStyle: {fontSize: 14, fontWeight: '500'},
      }}>
      <Tab.Screen name="Attendance" component={Attendance} />
      <Tab.Screen name="List" component={LoginList} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});
