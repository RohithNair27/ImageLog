import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import React, {useState, useContext} from 'react';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import {DataContext} from '../context/DataContext/DataContext';
const Login = ({navigation}) => {
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
      <View style={{width: '90%', flex: 0.4}}>
        <Image
          source={require('../assets/Images/qrImage.png')}
          resizeMode="contain"
          style={styles.image}
        />
      </View>

      <Text style={{color: 'black', fontSize: 50, fontWeight: '700'}}>
        Welcome!
      </Text>

      <View style={styles.textInputBody}>
        {Object.keys(personData).map(keys => {
          return (
            <View key={keys} style={styles.mobileInputbody}>
              <InputBox
                keyProps={keys}
                placeHolder={personData[keys].title}
                value={personData[keys].value}
                onValueChange={handleInputChange}
                keyBoardType={personData[keys].keyBoardType}
                maxLength={personData[keys].maxLength}
              />
            </View>
          );
        })}
      </View>
      <View style={styles.button}>
        <Button
          placeHolder="Sign In"
          backGroundColor={'#f84a55'}
          onPress={() =>
            //  console.log(typeof personData.name.value)
            onSignIn()
          }
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
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
    top: HEIGHT * 0.09,
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
