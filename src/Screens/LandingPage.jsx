import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FarmerWomen from '../assets/Images/Farmer_lady_nobg.svg';
import Button from '../components/Button';
const LandingPage = ({navigation}) => {
  return (
    <View style={styles.loginBody}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerMainText}>ImageLog</Text>
        <Text style={styles.headerMoreInfoText}>
          Helps workers track their hours accurately for fair wages
        </Text>
      </View>
      <FarmerWomen style={{width: '100%', height: '50%'}} />
      <Button
        placeHolder="Get started"
        backGroundColor={'#FFC834'}
        width={'80%'}
        height={'8%'}
        onPress={() => navigation.navigate('Signup')}
      />
    </View>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  loginBody: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  headerContainer: {
    width: '80%',
    alignItems: 'center',
  },
  headerMainText: {
    color: 'black',
    fontSize: 50,
    fontWeight: '500',
  },
  headerMoreInfoText: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
  },
});
