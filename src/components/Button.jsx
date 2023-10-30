import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

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
const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    width: '100%',
    height: '100%',
  },
  text: {
    color: 'white',
    fontWeight: '600',
  },
});
