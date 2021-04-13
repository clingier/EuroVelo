import React, {Component} from 'react';
import {useState} from 'react';
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
    inactive: {
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
            location: null,
            geocode: null,
            trace: null,
            trace_id: null,
            trace_db: props.trace_db
        };
        this.getLocationAsync.bind(this);
        this.loadTrace.bind(this);
        // this.getLocationAsync(); // c'est pour que ça start sur notre position // jsp si c'est la meilleure façon de faire
    }

    componentDidMount() {
        this.setState({trace: null})
    }

    loadTrace = (name) => {
        let trace = null;
        if (name == this.state.trace_id)
            this.setState({trace: null, trace_id: null})
        else {
            this.state.trace_db.transaction(tx => {
                tx.executeSql("SELECT * FROM traces WHERE route_id == ?;", [name],
                (txObj, { rows: { _array } }) => this.setState({trace: _array, trace_id: name}),
                (txObj, error) => console.log("Error ", error)
                )
            })
        }
        this.setState({trace: trace, trace_id: name});
    }

    getLocationAsync = async () => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.BestForNavigation});
        const {latitude, longitude} = location.coords;
        this.setState({location: {latitude, longitude}});
        const newCamera = {
            center: {latitude: latitude, longitude: longitude},
            zoom: 15,
            heading: 0,
            pitch: 0,
            altitude: 5
        }
        this._map.animateCamera(newCamera, {duration: 2000});
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    ref={component => this._map = component}>

                    {this.state.location && <Marker coordinate={this.state.location} flat anchor={{x: 0.5, y: 0.5}}>
                        <View>
                            <PositionLogo/>
                        </View>
                    </Marker>}

                    {this.state.trace &&
                    <Polyline coordinates={this.state.trace} strokeWidth={2} strokeColor={"black"}/>}
                </MapView>

                <View style={styles.roadselector}>
                    <RoadSelector callback={this.loadTrace}/>
                </View>

                <View style={styles.container}>
                    <TouchableOpacity
                        onPress={this.getLocationAsync}
                        style={(this.state.location) ? styles.locationlogo : [styles.locationlogo, styles.inactive]}
                    >
                        <LocationLogo width={30} height={30} fill={"white"}/>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

export default HomeScreen;
