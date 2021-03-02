import React from 'react'
import { useState } from 'react'
import {StyleSheet, Text, View, Dimensions, Alert} from 'react-native'
import MapView, { Polyline } from 'react-native-maps'
import getRoad from '../../../ev3'

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


const HomeScreen = (props) => {
  const myRoad = getRoad()
  const [width, setWidth] = useState({
    strokeColor : 'black',
    width : 2
  })

  return (
      <View>
          <MapView style={styles.map}>
              <Polyline coordinates={myRoad} strokeWidth={width.width} strokeColor={width.strokeColor}/>
          </MapView>
      </View>
  )
}

export default HomeScreen;