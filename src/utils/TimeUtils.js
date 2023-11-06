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
  const month = currentTime.getMonth();
  const year = currentTime.toISOString().slice(0, 4);

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
    month: month,
    year: year,
  };
};

export default GetCurrentDay;
