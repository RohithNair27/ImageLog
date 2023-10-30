import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import React, {useState} from 'react';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import {launchCamera} from 'react-native-image-picker';
const Login = ({navigation}) => {
  const [personData, setPersonData] = useState({
    name: {title: 'Enter you name', value: '', keyBoardType: 'text'},
    number: {
      title: 'Enter your mobile number',
      value: '',
      keyBoardType: 'tel',
      maxLength: 10,
    },
  });

  //This code handles the change in input values and adds it to personData
  const handleInputChange = (key, text) => {
    setPersonData({
      ...personData,
      [key]: {...personData[key], value: text},
    });
  };

  return (
    <View style={styles.loginBody}>
      <View style={{width: '90%', flex: 0.4}}>
        <Image
          source={require('../assets/Images/Image4.jpg')}
          resizeMode="contain"
          style={styles.image}
        />
      </View>

      <View style={styles.textInputBody}>
        <Text style={{color: 'black', fontSize: 50, fontWeight: '800'}}>
          Welcome!
        </Text>

        {Object.keys(personData).map(keys => {
          return (
            <View key={keys} style={styles.mobileInputbody}>
              <InputBox
                keyProps={keys}
                placeHolder={personData[keys].title}
                value={personData[keys].value}
                onValueChange={handleInputChange}
                keyBoardType={personData[keys].keyBoardType}
              />
            </View>
          );
        })}
      </View>
      <View style={styles.button}>
        <Button
          placeHolder="Sign In"
          backGroundColor={'#f84a55'}
          onPress={() => navigation.navigate('Attendance')}
        />
      </View>
    </View>
  );
};

export default Login;

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  loginBody: {
    // borderWidth: 1,
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    // top: HEIGHT * 0.1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  mobileInputbody: {
    backgroundColor: '#f1f1f3',
    marginVertical: 10,
    borderRadius: 20,
    width: '100%',
    height: '12%',
    paddingLeft: 10,
  },

  textInputBody: {
    top: HEIGHT * 0.05,
    alignItems: 'center',
    width: '80%',
    // borderWidth: 1,
    flex: 1,
  },
  button: {
    bottom: HEIGHT * 0.05,
    // borderWidth: 1,
    flex: 0.13,
    width: '80%',
    // height: '7%',
  },
});
