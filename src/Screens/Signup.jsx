import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useContext} from 'react';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import {DataContext} from '../context/DataContext/DataContext';

const Signup = ({navigation}) => {
  const {setUserId} = useContext(DataContext);
  const [personData, setPersonData] = useState({
    name: {
      title: 'User ID',
      value: '',
      keyBoardType: 'tel',
      maxLength: 6,
    },
    number: {
      title: 'Password',
      value: '',
      keyBoardType: 'tel',
      maxLength: 10,
    },
    confirmPassword: {
      title: 'Confirm password',
      value: '',
      keyBoardType: 'tel',
      maxLength: 10,
    },
  });

  const onSignIn = () => {
    setUserId(personData);
    navigation.navigate('TabNavigator');
  };

  //This code handles the change in input values and adds it to personData
  const handleInputChange = (key, text) => {
    setPersonData({
      ...personData,
      [key]: {...personData[key], value: text},
    });
  };

  return (
    <View style={styles.loginBody}>
      <Text style={styles.textHeader}>Create your account!</Text>
      <Text style={styles.headerMoreInfoText}>
        Please enter you details here
      </Text>
      <View style={styles.inputBoxContainer}>
        {Object.keys(personData).map(keys => {
          return (
            <InputBox
              key={keys}
              keyProps={keys}
              placeHolder={personData[keys].title}
              value={personData[keys].value}
              onValueChange={handleInputChange}
              keyBoardType={personData[keys].keyBoardType}
              maxLength={personData[keys].maxLength}
              width={'90%'}
              height={'13%'}
              backGroundColor={'#f4f4f4'}
              paddingLeft={20}
            />
          );
        })}

        <Button
          placeHolder="Sign In"
          backGroundColor={'#FFC834'}
          width={'80%'}
          height={'13%'}
          onPress={() =>
            //  console.log(typeof personData.name.value)
            onSignIn()
          }
        />
        <Text style={styles.loginText}>
          Already have an account?
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}
            style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{...styles.loginText, color: '#FFC834'}}>Login</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};

export default Signup;

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  loginBody: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerMoreInfoText: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textHeader: {
    color: 'black',
    fontSize: 30,
    fontWeight: '800',
  },

  inputBoxContainer: {
    // borderWidth: 1,
    width: '90%',
    height: '60%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  loginText: {
    color: 'black',
  },
});
