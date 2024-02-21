import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Button = ({placeHolder, backGroundColor, onPress}) => {
  return (
    <TouchableOpacity
      style={{...styles.body, backgroundColor: backGroundColor}}
      onPress={() => onPress()}>
      <Text style={styles.text}>{placeHolder}</Text>
    </TouchableOpacity>
  );
};

export default Button;
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    fontWeight: '600',
    height: '60%',
    width: '100%',
  },
  text: {
    color: 'white',
    fontWeight: '900',
    fontSize: 18,
    fontFamily: 'DMSans_18pt-ExtraBold',
  },
  iconStyle: {
    position: 'absolute',
    left: WIDTH * 0.05,
  },
});
