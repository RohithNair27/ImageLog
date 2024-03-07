import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Alert,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import React, {useEffect, useState, useContext, useRef} from 'react';
import Button from '../components/Button';
import {launchCamera} from 'react-native-image-picker';
import {request, RESULTS, PERMISSIONS} from 'react-native-permissions';
import GetCurrentDay from '../utils/TimeUtils';
import {storeData, getData} from '../utils/Storage';
import {uploadDataFireBase} from '../utils/Firebase';
import Modal from 'react-native-modal';
import InputBox from '../components/InputBox';

import {DataContext} from '../context/DataContext/DataContext';

const Attendance = ({navigation}) => {
  const {userId, setUserId} = useContext(DataContext);

  const inInitialRender = useRef(true);
  const [checkPressed, setCheckPressed] = useState(false);
  const [newtworkState, setnewtworkState] = useState(true);
  const [waitingForUpload, setWaitingForUpload] = useState(false);
  const [Data, setData] = useState({
    LoginStatus: '',
    EmployeeIdEntered: '',
    Date: '',
    Day: '',
    ImageUrl: '',
    Time: null,
    month: '',
    year: '',
  });
  const [EmployeeId, setEmployeeID] = useState('');

  const [profilePictureUri, setProfilePictureUri] = useState(false);
  // const [imageBase64, setImageBase64] = useState(false);

  const changeNetworkMode = () => {
    console.log('pressed');
    setnewtworkState(!newtworkState);
  };

  const handleValueChange = (key, changed) => {
    setEmployeeID(changed);
    // Data.EmployeeIdEntered(changed);
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
      includeBase64: true,
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
        // let base64 = response.assets?.[0]?.base64;
        setProfilePictureUri(imageUri);
        // setImageBase64(base64);
      }
    });
  };

  const SendDataToFirebase = async () => {
    const storageData = await getData();
    const currentDate = GetCurrentDay().date;
    const currentMonth = GetCurrentDay().month;
    const currentYear = GetCurrentDay().year;
    const stringDocument = JSON.stringify(
      currentDate + '-' + currentMonth + '-' + currentYear,
    );

    storageData.map(async data => {
      setWaitingForUpload(true);
      const returned = await uploadDataFireBase(data, 1234, stringDocument);
      if (returned === 'UPDATED') {
        setWaitingForUpload(false);
      }
    });
  };

  //CheckIn
  const onClickCheckIn = () => {
    setData({
      LoginStatus: 'check In',
      Date: GetCurrentDay().date,
      Day: GetCurrentDay().abbreviation,
      ImageUrl: profilePictureUri,
      Time: GetCurrentDay().hours,
      EmployeeIdEntered: EmployeeId,
      month: GetCurrentDay().month,
      year: GetCurrentDay().year,
    });
    setCheckPressed(!checkPressed);
  };

  const onClickCheckOut = () => {
    setData({
      LoginStatus: 'Check Out',
      Date: GetCurrentDay().date,
      Day: GetCurrentDay().abbreviation,
      ImageUrl: profilePictureUri,
      Time: GetCurrentDay().hours,
      EmployeeIdEntered: EmployeeId,
      month: GetCurrentDay().month,
      year: GetCurrentDay().year,
    });
    setCheckPressed(!checkPressed);
  };

  const storeInAsync = async () => {
    const reply = await storeData(Data);
    setData({
      LoginStatus: '',
      EmployeeIdEntered: '',
      Date: '',
      Day: '',
      ImageUrl: '',
      Time: null,
      // image: '',
      month: '',
      year: '',
    });

    if (reply === 'Please complete checkIn' && EmployeeId !== '') {
      Alerts('Info', 'Please checkin for today');
      setProfilePictureUri(false);
      setEmployeeID('');
      return 0;
    }
    setProfilePictureUri(false);
    setEmployeeID('');
    if (
      reply !== 'Already checked out for the day ' &&
      reply !== 'Login completed for today'
    ) {
      console.log('not working');
      // SendDataToFirebase();
      //
    } else {
      if (
        reply === 'Please complete checkIn' &&
        reply !== 'Login completed for today'
      ) {
        Alerts('Info', 'Please checkin for today');
      } else {
        Alerts('Error', reply);
      }
    }
  };

  useEffect(() => {
    if (!inInitialRender.current) {
      if (Data.ImageUrl === ('' || false) || Data.EmployeeIdEntered === '') {
        Alerts('Incomplete!', 'Please Add Image and EmployeeId');
      } else {
        storeInAsync();
        console.log('reached');
      }
    }
  }, [checkPressed]);

  useEffect(() => {
    console.log(userId);
    inInitialRender.current = false;
  }, []);

  useEffect(() => {
    if (!inInitialRender.current) {
      storeInAsync();
    }
  }, [newtworkState]);

  useState;

  return (
    <View style={styles.Body}>
      <FlashMessage position="top" />
      {/* <StatusBar backgroundColor={'white'} /> */}

      <Modal
        isVisible={waitingForUpload}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        animationInTiming={400}>
        <View style={styles.waitingModalStyle}>
          <ActivityIndicator size={60} />
        </View>
      </Modal>
      {/* <Text style={styles.headerText}>Offline</Text>
        <Switch
          value={newtworkState}
          onValueChange={changeNetworkMode}
          activeText={''}
          inActiveText={''}
          circleSize={35}
        />

        <Text style={styles.headerText}>Online</Text> */}

      <Image
        source={
          profilePictureUri === false
            ? require('../assets/Images/demoimage.png')
            : {uri: profilePictureUri}
        }
        resizeMode="contain"
        style={styles.image}
      />
      <View style={styles.textInputBody}>
        <InputBox
          placeHolder={'Unique id'}
          value={EmployeeId}
          onValueChange={handleValueChange}
          keyBoardType={'tel'}
          maxLength={6}
          icon={'id-card'}
        />
        <View style={styles.button}>
          <Button
            placeHolder="Take Image"
            backGroundColor={'#007afe'}
            onPress={getMobilePermission}
            ImageProps="camera"
          />
        </View>
      </View>

      <View style={styles.checkButtonBody}>
        <View style={styles.checkButton}>
          <Button
            placeHolder="Check In"
            backGroundColor={'#f84a55'}
            onPress={onClickCheckIn}
            ImageProps="login"
          />
        </View>
        <View style={styles.checkButton}>
          <Button
            placeHolder="Check Out"
            backGroundColor={'#f84a55'}
            onPress={onClickCheckOut}
            ImageProps="logout"
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
    width: '40%',
    height: '1%',
    borderWidth: 1,
  },

  image: {
    height: 150,
    width: 150,
    alignItems: 'center',
    borderRadius: 100,
    justifyContent: 'center',
  },
  textInputBody: {
    // borderWidth: 1,
    width: '80%',
    height: '30%',
    alignItems: 'center',

    justifyContent: 'space-evenly',
  },
  checkButtonBody: {
    // borderWidth: 1,
    width: '80%',
    height: '15%',
  },
  checkButton: {
    height: '70%',
  },
  button: {
    height: '35%',
    width: '60%',
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

  buttonContainer: {
    width: '100%',
    height: '100%',
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
  waitingModalStyle: {
    width: WIDTH * 0.5,
    backgroundColor: 'white',
    height: HEIGHT * 0.3,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
