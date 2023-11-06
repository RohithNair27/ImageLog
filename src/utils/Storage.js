import AsyncStorage from '@react-native-async-storage/async-storage';
import {uploadDataFireBase} from './Firebase';
export const storeData = async data => {
  const new_key = data.EmployeeIdEntered;
  const stringKey = JSON.stringify(new_key);

  try {
    const value = await AsyncStorage.getItem(stringKey);
    const parsedData = JSON.parse(value);
    if (value !== null) {
      const updatedData = {...parsedData, checkOut: data};
      const updatedStringData = JSON.stringify(updatedData);
      await AsyncStorage.setItem(stringKey, updatedStringData);
    } else {
      const newData = {checkIn: data};
      const stringData = JSON.stringify(newData);
      await AsyncStorage.setItem(stringKey, stringData);
    }
  } catch (e) {
    return 'Data cannot be added';
  }
};

export const getData = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const data = [];
    for (const key of keys) {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        const parsedData = JSON.parse(value);
        data.push(parsedData);
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
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing AsyncStorage data:', error);
    throw error;
  }
};

export const sendDataToFireBase = () => {};
