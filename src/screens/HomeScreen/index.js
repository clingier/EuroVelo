import React, {Component} from 'react';
import { useState } from 'react';
import {StyleSheet, View, Dimensions, Alert, TouchableOpacity} from 'react-native';
import RoadSelector from './RoadSelector';
import MapView, {Polyline, Marker} from 'react-native-maps';
import LocationLogo from '../../assets/svg/location.svg';
import PositionLogo from '../../assets/svg/position.svg';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
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
      trace: null
    };
    this.getLocationAsync.bind(this);
    this.loadTrace.bind(this);
  }


  loadTrace = async (path) => {
      fetch(path, {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
       })
      .then(function(response){
        console.log(response)
        return response.json();
      })
      .then((myJson) => {
        console.log(myJson);
        this.setState({trace: myJson});
      });
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
    traceToRender = 'trace' in this.state;

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