import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';

const InputBox = ({
  placeHolder,
  value,
  keyBoardType,
  onValueChange,
  keyProps,
  maxLength,
}) => {
  return (
    <TextInput
      placeholder={placeHolder}
      placeholderTextColor={'lightgray'}
      style={styles.textBody}
      value={value}
      onChangeText={onValueChange}
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
    fontWeight: '600',
    height: '100%',
    width: '100%',
  },
});
