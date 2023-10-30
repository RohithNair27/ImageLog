import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async data => {
  const key = data.seconds;
  const stringKey = JSON.stringify(key);
  const stringData = JSON.stringify(data);
  try {
    await AsyncStorage.setItem(stringKey, stringData);
  } catch (e) {
    // saving error
  }
};

export const getData = async () => {
  // try {
  //   await AsyncStorage.clear(); // This will remove all data stored in AsyncStorage
  // } catch (error) {
  //   console.error('Error clearing AsyncStorage data:', error);
  //   throw error;
  // }
  try {
    const keys = await AsyncStorage.getAllKeys();
    const data = [];
    for (const key of keys) {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        const String = JSON.parse(value);
        data.push(String);
      }
    }
    return data;
  } catch (error) {
    console.error('Error in getAllData:', error);
    throw error;
  }
};

export const removeData = async () => {
  try {
    await AsyncStorage.clear(); // This will remove all data stored in AsyncStorage
  } catch (error) {
    console.error('Error clearing AsyncStorage data:', error);
    throw error;
  }
};
