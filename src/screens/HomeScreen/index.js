import React from 'react'
import { useState } from 'react'
import {StyleSheet, Text, View, Dimensions, Alert} from 'react-native'
import MapView, { Polyline } from 'react-native-maps'
import getRoad1 from '../../../maps_data/eurovelo1'
import getRoad2 from '../../../maps_data/eurovelo2'
import getRoad3 from '../../../maps_data/eurovelo3'
import getRoad4 from '../../../maps_data/eurovelo4'
import getRoad5 from '../../../maps_data/eurovelo5'
import getRoad6 from '../../../maps_data/eurovelo6'
import getRoad7 from '../../../maps_data/eurovelo7'
import getRoad8 from '../../../maps_data/eurovelo8'
import getRoad9 from '../../../maps_data/eurovelo9'
import getRoad10 from '../../../maps_data/eurovelo10'
import getRoad11 from '../../../maps_data/eurovelo11'
import getRoad12 from '../../../maps_data/eurovelo12'
import getRoad13 from '../../../maps_data/eurovelo13'
import getRoad14 from '../../../maps_data/eurovelo14'
import getRoad15 from '../../../maps_data/eurovelo15'
import getRoad17 from '../../../maps_data/eurovelo17'
import getRoad19 from '../../../maps_data/eurovelo19'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});


const HomeScreen = (props) => {
  const road1 = getRoad1()
  const [width1, setWidth1] = useState({
    strokeColor : 'black',
    width : 2
  })

  const road2 = getRoad2()
  const [width2, setWidth2] = useState({
    strokeColor : 'brown',
    width : 2
  })

  const road3 = getRoad3()
  const [width3, setWidth3] = useState({
    strokeColor : 'red',
    width : 2
  })

  const road4 = getRoad4()
  const [width4, setWidth4] = useState({
    strokeColor : 'blue',
    width : 2
  })

  const road5 = getRoad5()
  const [width5, setWidth5] = useState({
    strokeColor : 'chocolate',
    width : 2
  })

  return (
      <View>
          <MapView style={styles.map}>
              <Polyline coordinates={road1} strokeWidth={width1.width} strokeColor={width1.strokeColor}/>
              <Polyline coordinates={road2} strokeWidth={width2.width} strokeColor={width2.strokeColor}/>
              <Polyline coordinates={road3} strokeWidth={width3.width} strokeColor={width3.strokeColor}/>
              <Polyline coordinates={road4} strokeWidth={width4.width} strokeColor={width4.strokeColor}/>
              <Polyline coordinates={road5} strokeWidth={width5.width} strokeColor={width5.strokeColor}/>
          </MapView>
      </View>
  )
}

export default HomeScreen;
