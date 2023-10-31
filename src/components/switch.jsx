import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
const Switch = ({switchState}) => {
  const [clicked, setClicked] = useState(switchState);
  const toggleLength = useSharedValue(0);

  const onPressToggle = () => {
    if (!clicked) {
      toggleLength.value = withTiming(toggleLength.value + 45, {
        duration: 200,
      });
      console.log(clicked);
      setClicked(!clicked);
    } else {
      toggleLength.value = withTiming(toggleLength.value - 45, {
        duration: 200,
      });
      console.log(clicked);
      setClicked(!clicked);
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: toggleLength.value}],
    };
  });

  return (
    <TouchableOpacity
      style={styles.switchContainer}
      onPress={() => onPressToggle()}>
      <Animated.View
        style={[styles.toggleButton, animatedStyle]}></Animated.View>
    </TouchableOpacity>
  );
};

export default Switch;

const styles = StyleSheet.create({
  switchContainer: {
    borderWidth: 1,
    width: 70,
    height: 25,
    borderRadius: 20,
    padding: 2,
  },
  toggleButton: {
    borderWidth: 1,
    height: '100%',
    width: 20,
    borderRadius: 20,
    backgroundColor: 'red',
  },
});
