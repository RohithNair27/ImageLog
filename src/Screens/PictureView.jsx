import {StyleSheet, Text, View, Image, StatusBar} from 'react-native';
import React from 'react';

const PictureView = ({route}) => {
  const {uri} = route.params;
  console.log(uri);
  const localImagePatch = uri;
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'black'} />
      <Image
        source={{uri: localImagePatch}}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

export default PictureView;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
