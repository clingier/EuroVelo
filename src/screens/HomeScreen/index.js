import React, {Component} from 'react';
import { useState } from 'react';
import {StyleSheet, View, Dimensions, Alert, TouchableOpacity} from 'react-native';
import RoadSelector from './RoadSelector';
import MapView, {Polyline, Marker} from 'react-native-maps';
import LocationLogo from '../../assets/svg/location.svg';
import PositionLogo from '../../assets/svg/position.svg';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import trace1 from '../../assets/maps_data/eurovelo1.json';
import trace2 from '../../assets/maps_data/eurovelo2.json';
import trace3 from '../../assets/maps_data/eurovelo3.json';
import trace4 from '../../assets/maps_data/eurovelo4.json';
import trace5 from '../../assets/maps_data/eurovelo5.json';
import trace6 from '../../assets/maps_data/eurovelo6.json';
import trace7 from '../../assets/maps_data/eurovelo7.json';
import trace8 from '../../assets/maps_data/eurovelo8.json';
import trace9 from '../../assets/maps_data/eurovelo9.json';
import trace10 from '../../assets/maps_data/eurovelo10.json';
import trace11 from '../../assets/maps_data/eurovelo11.json';
import trace12 from '../../assets/maps_data/eurovelo12.json';
import trace13 from '../../assets/maps_data/eurovelo13.json';
import trace14 from '../../assets/maps_data/eurovelo14.json';
import trace15 from '../../assets/maps_data/eurovelo15.json';
import trace17 from '../../assets/maps_data/eurovelo17.json';
import trace19 from '../../assets/maps_data/eurovelo19.json';


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  locationlogo: {
    backgroundColor: '#2FD175',
    margin: 40,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,
    elevation: 13,  
  },
  inactive : {
    backgroundColor: '#C7C7C7',
  },
  roadselector: {
    alignSelf: 'flex-start',
    position: 'absolute',
    top: 10,
    margin: 20
  }
});

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location:null,
      geocode:null,
      trace: null,
      trace_id: null
    };
    this.getLocationAsync.bind(this);
    this.loadTrace.bind(this);
  }

  componentDidMount() {
    this.setState({trace: null})
  }
  
  loadTrace = (name) => {
    let trace = null;
    if(name == this.state.trace_id)
      this.setState({trace: null, trace_id: null})
    else
    {
      switch(name){
      case 'ev1':
        trace = trace1
        break;
      case 'ev2':
        trace = trace2
        break;
      case 'ev3':
        trace = trace3
        break;
      case 'ev4':
        trace = trace4
        break;
      case 'ev5':
        trace = trace5
        break;
      case 'ev6':
        trace = trace6
        break;
      case 'ev7':
        trace = trace7
        break;
      case 'ev8':
        trace = trace8
        break;
      case 'ev9':
        trace = trace9
        break;
      case 'ev10':
        trace = trace10
        break;
      case 'ev11':
        trace = trace11
        break;
      case 'ev12':
        trace = trace12
        break;
      case 'ev13':
        trace = trace13
        break;
      case 'ev14':
        trace = trace14
        break;
      case 'ev15':
        trace = trace15
        break;
      case 'ev17':
        trace = trace17
        break;
      case 'ev19':
        trace = trace19
        break;
      }
      this.setState({trace: trace, trace_id: name});
    }
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    
    let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.BestForNavigation});
    const { latitude , longitude } = location.coords;
    this.setState({ location: {latitude, longitude}});
    const newCamera = {
      center: { latitude: latitude, longitude: longitude},
      zoom: 15,
      heading: 0,
      pitch: 0,
      altitude: 5
    }
    this._map.animateCamera(newCamera, { duration: 2000 });
  }

  render(){
    return (
      <View style={styles.container}>
        <MapView 
        style={styles.map}
        ref={component => this._map = component}>

          {this.state.location && <Marker coordinate={this.state.location} flat anchor={{ x: 0.5, y: 0.5 }}>
            <View>
              <PositionLogo />
            </View>
          </Marker>}

          {this.state.trace && <Polyline coordinates={this.state.trace} strokeWidth={2} strokeColor={"black"}/>}
        </MapView>

        <View style={styles.roadselector}>
          <RoadSelector callback={this.loadTrace}/>
        </View>

        <View style={styles.container}>
        <TouchableOpacity
          onPress={this.getLocationAsync}
          style={(this.state.location) ? styles.locationlogo : [styles.locationlogo, styles.inactive]}
          >
          <LocationLogo width={30} height={30} fill={"white"} />
        </TouchableOpacity>
        </View>

      </View>
    )
  }
}

export default HomeScreen;