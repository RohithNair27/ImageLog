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
import {useIsFocused, useRoute} from '@react-navigation/native';
const LoginList = () => {
  const isFocused = useIsFocused();
  const [peopleLogedIn, setPeopleLogedIn] = useState();
  const getDataFromLocal = async () => {
    const data = await getData();

    setPeopleLogedIn(data);
  };
  useEffect(() => {
    getDataFromLocal();
    // removeData();
  }, [isFocused]);
  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <Text style={styles.headerText}>EMP Id</Text>
        <Text style={styles.headerText}>Time</Text>
        <Text style={styles.headerText}>Image</Text>
      </View>
      <ScrollView style={styles.body}>
        {peopleLogedIn?.map(element => {
          let Eachelement = Object.values(element)[0];

          return (
            <TouchableOpacity
              style={styles.buttonBody}
              key={Eachelement.CheckIn.EmployeeIdEntered}>
              <Text style={{color: 'black'}}>
                {Eachelement.CheckIn.EmployeeIdEntered}
              </Text>
              {Eachelement.CheckOut ? (
                <Text style={{color: 'black'}}>
                  {Eachelement.CheckIn.Time - Eachelement.CheckOut.Time}
                </Text>
              ) : (
                <Text style={{color: 'black'}}>Not checked out</Text>
              )}
              <Image
                source={{uri: Object.values(element)[0].CheckIn.ImageUrl}}
                resizeMode="contain"
                style={{height: 65, width: 65, borderRadius: 50}}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
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
  header: {
    backgroundColor: 'lightblue',
    width: '100%',
    height: HEIGHT * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  },
  headerText: {
    fontSize: 17,
    fontWeight: '900',
    color: 'black',
    // borderWidth: 1,
  },
  buttonBody: {
    borderWidth: 1,
    marginBottom: '5%',
    height: HEIGHT * 0.15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 10,
  },
});
