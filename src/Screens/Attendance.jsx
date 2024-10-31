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
import MaleProfile from '../assets/Images/MaleProfile.svg';
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
      // image: imageBase64,
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
      // image: imageBase64,
    });
    setCheckPressed(!checkPressed);
  };

  const handleNavigation = uri => {
    console.log(uri);
    navigation.navigate('PictureView', {uri});
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
    setProfilePictureUri(false);
    setEmployeeID('');
    if (
      newtworkState === true &&
      reply !== 'Already checked out for the day ' &&
      reply !== 'Login completed for today'
    ) {
      SendDataToFirebase();
    } else {
      if (
        newtworkState === false &&
        reply !== 'Already checked out for the day ' &&
        reply !== 'Login completed for today'
      ) {
        Alerts(
          'Info',
          'Switched to offline mode Please switch it back on to get the data stored',
        );
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
      <StatusBar backgroundColor={'#FFC834'} />
      <View style={styles.header}>
        <Modal
          isVisible={waitingForUpload}
          animationIn={'fadeIn'}
          animationOut={'fadeOut'}
          animationInTiming={400}>
          <View style={styles.waitingModalStyle}>
            <ActivityIndicator size={60} />
          </View>
        </Modal>
      </View>
      <View style={styles.ImageBody}>
        {profilePictureUri === false ? (
          <MaleProfile />
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
          backGroundColor={'#007afe'}
          onPress={getMobilePermission}
          ImageProps="camera"
        />
      </View>
      <ActivityIndicator size={30} animating={waitingForUpload} />
      <View style={styles.checkButtonBody}>
        <View style={styles.checkButton}>
          <Button
            placeHolder="Check In"
            backGroundColor={'#d95e54'}
            onPress={onClickCheckIn}
            ImageProps="login"
          />
        </View>
        <View style={styles.checkButton}>
          <Button
            placeHolder="Check Out"
            backGroundColor={'#d95e54'}
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
  waitingModalStyle: {
    width: WIDTH * 0.5,
    backgroundColor: 'white',
    height: HEIGHT * 0.3,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
