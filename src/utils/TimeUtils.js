import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const GetCurrentDay = () => {
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const currentTime = new Date();

  //day
  const dayIndex = currentTime.getDay();
  const currentDay = daysOfWeek[dayIndex];
  const currentDayAbbreviation = currentDay.slice(0, 3);
  const date = currentTime.getDate();

  //time
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  return {
    abbreviation: currentDayAbbreviation,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    date: date,
  };
};

export default GetCurrentDay;
