import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DataContext} from '../context/DataContext/DataContext';

const DailyInfo = ({element, navivation}) => {
  // const {data} = React.useContext(DataContext);

  const [time, setTime] = useState();
  // console.log(element.CheckInImageUrl);

  return (
    <View style={styles.body}>
      <View style={styles.textBody}>
        <Text style={styles.text}>{`${element.Date} ${element.Day}`}</Text>
      </View>
      <TouchableOpacity
        style={{width: '10%'}}
        onPress={() => navivation(element.CheckInImageUrl)}>
        <Image
          source={require('../assets/Images/MorningImage.png')}
          resizeMode="contain"
          style={styles.ImageSize}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{width: '10%'}}
        onPress={() => navivation(element.CheckOutImageUrl)}>
        <Image
          source={require('../assets/Images/NightImage.png')}
          resizeMode="contain"
          style={styles.ImageSize}
        />
      </TouchableOpacity>
      <Text style={styles.text}>{`${
        element.endTime - element.startTime
      } HOURS`}</Text>
    </View>
  );
};

export default DailyInfo;

const styles = StyleSheet.create({
  body: {
    width: '100%',
    height: '100%',
    // borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  textBody: {
    backgroundColor: 'lightgray',
    height: '80%',
    width: '12%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
  },
  ImageSize: {
    width: '100%',
    height: '100%',
  },
});
