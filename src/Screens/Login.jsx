import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import React, {useState, useContext} from 'react';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import {DataContext} from '../context/DataContext/DataContext';
import Logo from '../assets/Images/mindsprint-logo.svg';

const Login = ({navigation}) => {
  const {setUserId} = useContext(DataContext);
  const [personData, setPersonData] = useState({
    name: {
      title: 'Login ID',
      value: '',
      keyBoardType: 'numeric',
      maxLength: 6,
      icons: 'person',
      secureText: false,
    },
    number: {
      title: 'Password',
      value: '',
      keyBoardType: 'numeric',
      maxLength: 10,
      icons: 'lock-closed',
      secureText: true,
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
      <StatusBar backgroundColor={'white'} />

      <Logo width={'100%'} height={30} style={styles.image} />

      <View style={styles.textInputBody}>
        {Object.keys(personData).map(keys => {
          return (
            //
            <InputBox
              keyProps={keys}
              placeHolder={personData[keys].title}
              value={personData[keys].value}
              onValueChange={handleInputChange}
              keyBoardType={personData[keys].keyBoardType}
              maxLength={personData[keys].maxLength}
              icon={personData[keys].icons}
              secureText={personData[keys].secureText}
            />
          );
        })}
      </View>
      <View style={styles.mobileInputbody}>
        <Button
          placeHolder="Login"
          backGroundColor={'#f84a55'}
          onPress={() => onSignIn()}
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
    backgroundColor: 'white',
    flex: 1,
    // borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    borderWidth: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },

  mobileInputbody: {
    // borderWidth: 1,
    width: '80%',
    height: '10%',

    flexDirection: 'row',
    alignItems: 'center',
  },

  textInputBody: {
    alignItems: 'center',
    width: '80%',
    height: '30%',
    justifyContent: 'space-evenly',
  },
  button: {
    bottom: HEIGHT * 0.05,
    flex: 0.13,
    width: '80%',
    height: '18%',
  },
});
