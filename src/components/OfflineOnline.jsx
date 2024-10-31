import {StyleSheet, Text, View, Switch} from 'react-native';
import React, {useState} from 'react';

const OfflineOnline = () => {
  const [state, setState] = useState(true);
  return (
    <View style={styles.body}>
      <Switch
        // trackColor={{false: '#767577', true: '#81b0ff'}}
        // thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        // onValueChange={toggleSwitch}
        // value={isEnabled}
        style={{marginRight: 10}} // Adjusts position of the Switch
      />
      <View style={styles.indicatorContainer}>
        <View
          style={{
            ...styles.stateIndicator,
            backgroundColor: state ? 'green' : 'red',
          }}></View>
        <Text style={{...styles.stateText, color: state ? 'green' : 'red'}}>
          {state ? 'online' : 'offline'}
        </Text>
      </View>
    </View>
  );
};

export default OfflineOnline;

const styles = StyleSheet.create({
  body: {
    // borderWidth: 1,
    width: '50%',
    flexDirection: 'row',
  },
  stateIndicator: {
    width: 15,
    height: 15,
    borderRadius: 50,
    backgroundColor: 'red',
  },
  stateText: {
    color: 'red',
    fontSize: 17,
    fontWeight: '600',
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
    width: '40%',
    justifyContent: 'space-between',
  },
});
