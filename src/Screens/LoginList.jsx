import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getData, removeData} from '../utils/Storage';
import {useIsFocused, useRoute} from '@react-navigation/native';
const LoginList = ({navigation}) => {
  const isFocused = useIsFocused();
  const [peopleLogedIn, setPeopleLogedIn] = useState();

  const getDataFromLocal = async () => {
    const data = await getData();
    console.log(data.length);
    setPeopleLogedIn(data);
  };
  const handleNavigation = uri => {
    console.log(uri);
    navigation.navigate('PictureView', {uri});
  };
  useEffect(() => {
    getDataFromLocal();
  }, [isFocused]);
  return (
    <View style={{flex: 1}}>
      {isFocused ? <StatusBar backgroundColor={'#ed1515'} /> : null}
      <View style={styles.header}>
        <View style={styles.headerCheck}>
          <Text
            style={{
              fontWeight: '800',
              fontSize: 23,
              color: 'white',
              fontFamily: 'DMSans_18pt-ExtraBold',
            }}>
            Check in: 10
          </Text>
          <Text
            style={{
              fontWeight: '800',
              fontSize: 23,
              color: 'white',
              fontFamily: 'DMSans_18pt-ExtraBold',
            }}>
            Check out: 4
          </Text>
        </View>
        <Text
          style={{
            fontWeight: '800',
            fontSize: 23,
            color: 'white',
            fontFamily: 'DMSans_18pt-ExtraBold',
          }}>
          Currently in office: {peopleLogedIn?.length}
        </Text>
      </View>
      <ScrollView style={styles.body}>
        {peopleLogedIn?.map(element => {
          let eachelement = Object.values(element)[0];

          return (
            <TouchableOpacity
              style={styles.buttonBody}
              key={eachelement.CheckIn.EmployeeIdEntered}
              onPress={() => {
                handleNavigation(Object.values(element)[0].CheckIn.ImageUrl);
              }}>
              <Image
                source={{uri: Object.values(element)[0].CheckIn.ImageUrl}}
                resizeMode="contain"
                style={{height: 65, width: 65, borderRadius: 50}}
              />
              <View>
                <Text
                  style={{color: 'black', fontFamily: 'DMSans_18pt-ExtraBold'}}>
                  <Text style={styles.placeholder}> Emp id:</Text>{' '}
                  {eachelement.CheckIn.EmployeeIdEntered}
                </Text>
                <Text
                  style={{color: 'black', fontFamily: 'DMSans_18pt-ExtraBold'}}>
                  <Text style={styles.placeholder}>Login time:</Text>
                  {eachelement.CheckIn.Date +
                    '/' +
                    eachelement.CheckIn.month +
                    '/' +
                    eachelement.CheckIn.year}
                </Text>
                <Text
                  style={{color: 'black', fontFamily: 'DMSans_18pt-ExtraBold'}}>
                  <Text style={{color: 'black'}}>
                    <Text style={styles.placeholder}>Login time:</Text>

                    {eachelement.CheckOut
                      ? eachelement.CheckOut.Date +
                        '/' +
                        eachelement.CheckOut.month +
                        '/' +
                        eachelement.CheckOut.year
                      : '---'}
                  </Text>
                </Text>
              </View>
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
    backgroundColor: '#ed1515',
    width: '100%',
    height: HEIGHT * 0.19,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    flexDirection: 'column',
  },
  headerCheck: {
    // borderWidth: 1,
    width: '90%',
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 17,
    fontWeight: '900',
    color: 'black',
    fontFamily: 'DMSans_18pt-ExtraBold',
  },
  buttonBody: {
    borderWidth: 1,
    borderColor: 'lightgray',
    marginBottom: '5%',
    height: HEIGHT * 0.15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 10,
  },
  placeholder: {
    fontSize: 18,
    fontWeight: '600',
  },
});
