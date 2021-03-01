import * as React from 'react';
import MapView, { Polyline } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Alert } from 'react-native';
import { useState } from 'react';
import getRoad from './ev3';


var stateTest = {
  strokeWidth : 50,
  strokeColor : 'black'
}
export default function App() {

  console.log(getRoad()[0])
  const myRoad = getRoad()

  const [width,setWidth] = useState({
    strokeColor : 'black',
    width : 2
  })

  return (
    <View style={styles.container}>
      <MapView style={styles.map} >
        <Polyline onPress={()=>setWidth(
          {width : 5,
          strokeColor:'pink'})} 
          coordinates={myRoad}
    strokeWidth={width.width}
    strokeColor= {width.strokeColor}
    />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});



