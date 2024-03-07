import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useRef} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
const InputBox = ({
  placeHolder,
  value,
  keyBoardType,
  onValueChange,
  keyProps,
  maxLength,
  icon,
  secureText,
}) => {
  return (
    <View style={styles.textBody}>
      <Icon name={icon} size={25} color="gray" />

      <TextInput
        placeholder={placeHolder}
        placeholderTextColor={'lightgray'}
        value={value}
        onChangeText={text => onValueChange(keyProps, text)}
        inputMode={keyBoardType}
        maxLength={maxLength}
        style={styles.inputbox}
        secureTextEntry={secureText}
      />
    </View>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  textBody: {
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontFamily: 'DMSans_18pt-ExtraBold',
    height: '24%',
    width: '100%',
    borderWidth: 1,
    borderColor: 'lightgray',
    paddingLeft: '10%',
    flexDirection: 'row',
  },
  inputbox: {
    height: '100%',
    width: '100%',
    color: 'black',
    paddingLeft: '5%',
    fontFamily: 'DMSans_18pt-Bold',
  },
});
