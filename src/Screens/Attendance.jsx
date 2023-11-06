import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import Switch from '../components/switch';
import Button from '../components/Button';
import DailyInfo from '../components/DailyInfo';
import {launchCamera} from 'react-native-image-picker';
import {request, RESULTS, PERMISSIONS} from 'react-native-permissions';
import GetCurrentDay from '../utils/TimeUtils';
import {storeData, getData, removeData} from '../utils/Storage';
import {uploadDataFireBase} from '../utils/Firebase';
import InputBox from '../components/InputBox';

const Attendance = ({navigation}) => {
  const [newtworkState, setnewtworkState] = useState(true);
  const [waitingForUpload, setWaitingForUpload] = useState(false);
  const [Data, setData] = useState({
    checkIn: {
      Date: '',
      Day: '',
      CheckInImageUrl: '',
      startTime: null,
      endTime: null,
      seconds: '',
      EmployeeIdEntered: '',
      month: '',
      year: '',
    },
    checkOut: {
      Date: '',
      Day: '',
      CheckOutImageUrl: '',
      startTime: null,
      endTime: null,
      seconds: '',
      EmployeeIdEntered: '',
      month: '',
      year: '',
    },

    // TotalTime: '',
  });
  const [EmployeeId, setEmployeeID] = useState('');
  const [allData, setAllData] = useState([]);
  const [profilePictureUri, setProfilePictureUri] = useState(false);

  const changeNetworkMode = () => {
    setnewtworkState(!newtworkState);
  };

  const handleValueChange = changed => {
    setEmployeeID(changed);
  };

  const Alerts = (text1, text2) =>
    Alert.alert(text1, text2, [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

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
        // console.log(imageUri);
        setProfilePictureUri(imageUri);
      }
    });
  };

  const SendDataToFirebase = async () => {
    const storageData = await getData();

    storageData.map(data => {
      console.log('function logged');
      uploadDataFireBase(data);
    });
  };

  const onClickCheckOut = () => {
    const currentHourTime = GetCurrentDay().hours;
    const GetDay = GetCurrentDay().abbreviation;
    const GetSeconds = GetCurrentDay().seconds;
    const currentDate = GetCurrentDay().date;
    const currentMonth = GetCurrentDay().month;
    const currentYear = GetCurrentDay().year;
    setData({
      ...Data,
      checkOut: {
        Date: currentDate,
        Day: GetDay,
        CheckInImageUrl: profilePictureUri,
        startTime: currentHourTime,
        endTime: currentHourTime,
        seconds: GetSeconds,
        EmployeeIdEntered: EmployeeId,
        month: currentMonth,
        year: currentYear,
      },
    });
  };

  //CheckIn
  const onClickCheckIn = () => {
    const currentHourTime = GetCurrentDay().hours;
    const GetDay = GetCurrentDay().abbreviation;
    const GetSeconds = GetCurrentDay().seconds;
    const currentDate = GetCurrentDay().date;
    const currentMonth = GetCurrentDay().month;
    const currentYear = GetCurrentDay().year;

    setData({
      ...Data,
      checkIn: {
        Date: currentDate,
        Day: GetDay,
        CheckInImageUrl: profilePictureUri,
        startTime: currentHourTime,
        endTime: currentHourTime,
        seconds: GetSeconds,
        EmployeeIdEntered: EmployeeId,
        month: currentMonth,
        year: currentYear,
      },
    });
  };

  const getDataFromStorage = async () => {
    const values = await getData();
    setAllData(values);
    // console.log(values);
  };

  const handleNavigation = uri => {
    console.log(uri);
    navigation.navigate('PictureView', {uri});
  };

  const storeInAsync = () => {
    if (Data.checkIn.Date === '') {
      storeData(Data.checkOut, 'checkOut');
    } else {
      storeData(Data.checkIn, 'checkIn');
    }

    setData({
      checkIn: {
        Date: '',
        Day: '',
        CheckInImageUrl: '',
        startTime: null,
        endTime: null,
        seconds: '',
        EmployeeIdEntered: '',
      },
      checkOut: {
        Date: '',
        Day: '',
        CheckOutImageUrl: '',
        startTime: null,
        endTime: null,
        seconds: '',
        EmployeeIdEntered: '',
      },
    });
    setProfilePictureUri(false);
    setEmployeeID('');
  };

  useEffect(() => {
    if (
      Data.checkIn.CheckInImageUrl !== '' ||
      Data.checkOut.CheckOutImageUrl !== ''
    ) {
      storeInAsync();
      getDataFromStorage();
    }
    if (
      (Data.checkIn.CheckInImageUrl === '' ||
        Data.checkIn.EmployeeIdEntered === '') &&
      Data.checkIn.Date !== ''
    ) {
      // console.log(Data.checkIn.Date);
      Alerts('Incomplete!!', 'Please enter Image and EmployeeId');
    }

    if (
      Data.checkOut.CheckOutImageUrl === '' &&
      Data.checkOut.EmployeeIdEntered === '' &&
      Data.checkOut.Date !== ''
    ) {
      Alerts('Incomplete!!', 'Please enter Image and EmployeeId');
    }
  }, [Data]);

  useEffect(() => {
    if (newtworkState === true) {
      SendDataToFirebase();
    }
    console.log(allData);
  }, [allData]);

  useState;
  return (
    <View style={styles.Body}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Online</Text>
        <Switch switchState={newtworkState} onPress={changeNetworkMode} />

        <Text style={styles.headerText}>offline</Text>
      </View>
      <View style={styles.ImageBody}>
        {profilePictureUri === false ? (
          <Image
            source={require('../assets/Images/demoimage.png')}
            resizeMode="contain"
            style={styles.image}
          />
        ) : (
          <Image
            source={{uri: profilePictureUri}}
            resizeMode="contain"
            style={styles.image}
          />
        )}
      </View>
      <View style={styles.mobileInputbody}>
        <InputBox
          placeHolder={'employee Id'}
          value={EmployeeId}
          onValueChange={handleValueChange}
          keyBoardType={'tel'}
          maxLength={6}
        />
      </View>
      <View style={styles.button}>
        <Button
          placeHolder="Take Image"
          backGroundColor={'#05aaf7'}
          onPress={getMobilePermission}
        />
      </View>
      <ActivityIndicator size={30} animating={waitingForUpload} />
      <View style={styles.checkButtonBody}>
        <View style={styles.checkButton}>
          <Button
            placeHolder="Check In"
            backGroundColor={'#05aaf7'}
            onPress={onClickCheckIn}
          />
        </View>
        <View style={styles.checkButton}>
          <Button
            placeHolder="Check Out"
            backGroundColor={'#f84a55'}
            onPress={onClickCheckOut}
          />
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
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  image: {
    height: 150,
    width: 150,
    alignItems: 'center',
    borderRadius: 100,
    justifyContent: 'center',
  },
  ImageBody: {
    height: '40%',
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  mobileInputbody: {
    backgroundColor: '#f1f1f3',
    marginVertical: 10,
    borderRadius: 20,
    width: '90%',
    height: '8%',
    paddingLeft: 10,
  },
  checkButtonBody: {
    marginTop: '10%',
    width: '80%',
    height: '20%',
  },
  checkButton: {
    height: '40%',
    marginVertical: '2%',
  },
  button: {
    height: '7%',
    width: '50%',
    marginTop: 10,
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
    height: '50%',
    width: '100%',

    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    height: '100%',
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
