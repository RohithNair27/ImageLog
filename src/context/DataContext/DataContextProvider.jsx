import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {DataContext} from './DataContext';

const DataContextProvider = ({children}) => {
  const [userId, setUserId] = useState();
  return (
    <DataContext.Provider value={{userId, setUserId}}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
