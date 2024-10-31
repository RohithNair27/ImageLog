import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';

const InputBox = ({
  placeHolder,
  value,
  keyBoardType,
  onValueChange,
  keyProps,
  maxLength,
  height,
  width,
  backGroundColor,
  paddingLeft,
}) => {
  return (
    <TextInput
      placeholder={placeHolder}
      placeholderTextColor={'black'}
      style={{
        ...styles.textBody,
        width,
        height,
        backgroundColor: backGroundColor,
        paddingLeft: paddingLeft,
      }}
      value={value}
      onChangeText={text => onValueChange(keyProps, text)}
      inputMode={keyBoardType}
      maxLength={maxLength}
    />
  );
};

export default InputBox;

const styles = StyleSheet.create({
  textBody: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
  },
});
