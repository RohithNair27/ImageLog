import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import Switch from '../components/switch';
import Button from '../components/Button';
import DailyInfo from '../components/DailyInfo';
import {launchCamera} from 'react-native-image-picker';
import {request, RESULTS, PERMISSIONS} from 'react-native-permissions';
import GetCurrentDay from '../utils/TimeUtils';
import {storeData, getData} from '../utils/Storage';
import {removeData} from '../utils/Storage';
import firestore from '@react-native-firebase/firestore';

const Attendance = ({navigation}) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [sendData, setSendData] = useState(false);
  const [Data, setData] = useState({
    Date: '',
    Day: '',
    CheckInImageUrl: '',
    CheckOutImageUrl: '',
    startTime: null,
    endTime: null,
    seconds: '',
    // TotalTime: '',
  });
  const [checkedIn, setCheckIn] = useState(true);
  const [allData, setAllData] = useState([]);
  const [sync, setSync] = useState(false);

  const ref = firestore().collection('Data');

  const uploadDataFireBase = () => {
    console.log(allData);
    ref
      .add({
        logData: allData,
      })
      .then(() => {
        console.log('working');
      })
      .catch(e => {
        console.log(e);
      });
  };

  //counter logic
  useEffect(() => {
    let interval;

    if (!checkedIn) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds === 59) {
            setMinutes(prevMinutes => {
              if (prevMinutes === 59) {
                setHours(prevHours => prevHours + 1);
                return 0;
              }
              return prevMinutes + 1;
            });
            return 0;
          }
          return prevSeconds + 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [checkedIn]);

  const onClickCheckOut = imageUri => {
    const currentHourTime = GetCurrentDay().hours;
    const GetDay = GetCurrentDay().abbreviation;
    const GetSeconds = GetCurrentDay().seconds;
    setData(prevData => ({
      ...prevData,
      endTime: currentHourTime,
      CheckOutImageUrl: imageUri,
      Day: GetDay,
      seconds: GetSeconds,
    }));
    setSendData(!sendData);
  };

  //CheckIn
  const onClickCheckIn = imageUri => {
    const currentHourTime = GetCurrentDay().hours;
    const currentDate = GetCurrentDay().date;
    console.log(currentHourTime);
    setData(prevData => ({
      ...prevData,
      startTime: currentHourTime,
      CheckInImageUrl: imageUri,
      Date: currentDate,
    }));
  };

  //Andriod permission
  const getMobilePermission = async () => {
    try {
      const result = await request(PERMISSIONS.ANDROID.CAMERA);
      if (result === RESULTS.GRANTED) {
        console.log('You can use the camera');
        getProfilePictureDevice();
      } else {
        console.log('Camera permission denied');
      }
    } catch (error) {
      console.error(error);
    }
  };
  //This is used to take image from camera
  const getProfilePictureDevice = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('image not picked');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.assets?.[0]?.uri;

        if (checkedIn === true) {
          onClickCheckIn(imageUri);
          setSeconds(0);
          setHours(0);
          setMinutes(0);
          setCheckIn(!checkedIn);
        } else {
          onClickCheckOut(imageUri);
          setCheckIn(!checkedIn);
        }
      }
    });
  };

  const getDataFromStorage = async () => {
    const values = await getData();

    setAllData(values);
    uploadDataFireBase();
  };

  const handleNavigation = uri => {
    console.log(uri);
    navigation.navigate('PictureView', {uri});
  };

  useEffect(() => {
    if (Data.Date !== '') {
      storeData(Data);
    }
    getDataFromStorage();
    // uploadDataFireBase();
    // removeData();
  }, [sendData]);

  useState;
  return (
    <View style={styles.Body}>
      <View style={styles.header}>
        {/* <Image
          source={require('../assets/Images/Image4.jpg')}
          resizeMode="contain"
          style={styles.image}
        />
        <Text style={styles.headerText}>Hey! Rohith</Text> */}
        <Switch switchState={sync} />
      </View>
      <View
        style={
          checkedIn
            ? styles.checkInContainer
            : {...styles.checkInContainer, borderColor: '#f84a55'}
        }>
        <Text
          style={
            checkedIn
              ? styles.todayText
              : {...styles.todayText, color: '#f84a55'}
          }>
          Today
        </Text>

        <Text style={styles.timeText}>
          {hours.toString().padStart(2, '0')}:
          {minutes.toString().padStart(2, '0')}:
          {seconds.toString().padStart(2, '0')}
        </Text>
        <Text style={styles.timeTrackedText}>Total Time Tracked</Text>
        <View style={styles.buttonContainer}>
          <Button
            placeHolder={checkedIn ? 'Check In' : 'Check Out'}
            backGroundColor={checkedIn ? '#05aaf7' : '#f84a55'}
            onPress={getMobilePermission}
          />
        </View>
      </View>
      <View style={styles.attendanceHistory}>
        <View
          style={
            checkedIn
              ? styles.listHeader
              : {...styles.listHeader, backgroundColor: '#f84a55'}
          }>
          <Text style={styles.listHeaderDate}>Date</Text>
          <Text style={styles.listHeaderDate}>Check In</Text>
          <Text style={styles.listHeaderDate}>Check Out</Text>
          <Text style={styles.listHeaderDate}>Total Hr's</Text>
        </View>
        <View style={{width: '90%', top: '2%'}}>
          <ScrollView>
            {allData?.map(element => {
              return (
                <View style={styles.dailyInfoContainer} key={element.seconds}>
                  <DailyInfo element={element} navivation={handleNavigation} />
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default Attendance;
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
  Body: {
    // borderWidth: 1,
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: '70%',
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    // borderWidth: 1,
    height: '10%',
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: 'black',
    fontSize: 23,
    fontWeight: '900',
  },
  checkInContainer: {
    borderWidth: 2,
    height: '30%',
    width: '85%',
    borderRadius: 20,
    borderColor: '#05aaf7',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  attendanceHistory: {
    marginTop: 20,
    // borderWidth: 1,
    height: '50%',
    width: '100%',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '90%',
    height: '26%',
  },
  todayText: {
    color: '#05aaf7',
    fontSize: 25,
    fontWeight: '600',
  },
  timeText: {
    color: 'black',
    fontSize: 45,
    fontWeight: '800',
  },
  timeTrackedText: {
    color: 'gray',
  },
  listHeader: {
    // borderWidth: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    height: HEIGHT * 0.09,
    backgroundColor: '#05aaf7',
    width: '100%',
  },
  listHeaderDate: {
    color: 'white',
    fontWeight: '800',
    // fontSize: 14,
  },
  dailyInfoContainer: {
    borderBottomWidth: 1,
    borderColor: 'lightgray',

    width: '100%',
    height: HEIGHT * 0.07,
  },
});
