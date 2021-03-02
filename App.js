import * as React from 'react';
import MapView, { Polyline } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Alert } from 'react-native';
import { useState } from 'react';
import getRoad from './ev3';
import HomeScreen from './src/screens/HomeScreen';


const App = () => {
  return(
    <HomeScreen/>
  );
};

export default App