import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Button = ({
  placeHolder,
  backGroundColor,
  onPress,
  ImageProps,
  width,
  height,
}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.body,
        backgroundColor: backGroundColor,
        width: width,
        height: height,
      }}
      onPress={() => onPress()}>
      <Icon
        name={ImageProps}
        size={30}
        color="white"
        style={styles.iconStyle}
      />
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
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    // justifyContent: '',
  },
  text: {
    color: 'white',
    fontWeight: '900',
  },
  iconStyle: {
    position: 'absolute',
    left: WIDTH * 0.05,
  },
});
