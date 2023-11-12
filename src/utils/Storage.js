import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async data => {
  let new_key = data.EmployeeIdEntered;
  const stringKey = JSON.stringify(new_key);
  const value = await AsyncStorage.getItem(stringKey);

  if (data.LoginStatus === 'check In') {
    if (value === null) {
      const newData = {
        [new_key]: {
          CheckIn: data,
        },
      };
      const stringData = JSON.stringify(newData);
      await AsyncStorage.setItem(stringKey, stringData);
      console.log('stored in async');
    } else {
      return 'already you did checkin';
    }
  } else {
    if (value === null) {
      console.log('Please do checkIn first');
    } else {
      const exsistingData = await AsyncStorage.getItem(stringKey);
      const exsistingObjectData = JSON.parse(exsistingData);
      // console.log(exsistingObjectData);
      if (exsistingObjectData[new_key].CheckOut) {
        return 'Already checked out for the day ';
      } else {
        console.log(exsistingObjectData[new_key]);
        const newData = {
          CheckOut: data,
        };

        const newObject = exsistingObjectData[new_key];
        const updatedObject = {...newObject, ...newData};

        const UpdatingData = {
          [new_key]: updatedObject,
        };
        const stringData = JSON.stringify(UpdatingData);

        await AsyncStorage.setItem(stringKey, stringData);
        console.log('checked out');
      }
    }
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
