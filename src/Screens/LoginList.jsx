import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getData, removeData} from '../utils/Storage';
import {useIsFocused} from '@react-navigation/native';
const LoginList = () => {
  const isFocused = useIsFocused();
  const [peopleLogedIn, setPeopleLogedIn] = useState();
  const getDataFromLocal = async () => {
    const data = await getData();
    // console.log(data);
    setPeopleLogedIn(data);
  };
  useEffect(() => {
    getDataFromLocal();
    // removeData();
  }, [isFocused]);
  return (
    <ScrollView style={styles.body}>
      {peopleLogedIn?.map(element => {
        // console.log(element);
        return (
          <TouchableOpacity
            style={styles.buttonBody}
            key={element.checkIn.EmployeeIdEntered}>
            <Text style={{color: 'black'}}>
              {element.checkIn.EmployeeIdEntered}
            </Text>

            {/* <Image
              source={{uri: element.CheckInImageUrl}}
              resizeMode="contain"
              style={{height: 65, width: 65, borderRadius: 50}}
            /> */}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default React.memo(LoginList);

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
  buttonBody: {
    borderBottomWidth: 1,
    flex: 1,
    // width: WIDTH,
    height: HEIGHT * 0.1,
    borderBottomColor: 'lightgray',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
