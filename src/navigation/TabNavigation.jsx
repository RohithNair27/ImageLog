import {StyleSheet, Text, View, Switch} from 'react-native';
import React from 'react';
import Attendance from '../Screens/Attendance';
import LoginList from '../Screens/LoginList';
import OfflineOnline from '../components/OfflineOnline';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'white',
          elevation: 0,
          borderColor: 'transparent',
        },
        headerRight: () => <OfflineOnline />,
        headerStyle: {
          backgroundColor: '#FFC834',
          height: 80,
        },
        headerTitle: '',
        headerTitleStyle: {
          fontWeight: 'bold',
          color: 'white',
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
