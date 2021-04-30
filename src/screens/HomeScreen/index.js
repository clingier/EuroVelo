import React from 'react';
import {StyleSheet, View, Dimensions, Alert, TouchableOpacity, Text, TouchableNativeFeedbackBase} from 'react-native';
import RoadSelector from './RoadSelector';
import MapView, {Polyline, Marker} from 'react-native-maps';
import Spinner from 'react-native-loading-spinner-overlay';
import LocationLogo from '../../assets/svg/location.svg';
import LockLocationLogo from '../../assets/svg/lock-location.svg';
import Bicycle from '../../assets/svg/bicycle.svg';
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
        marginBottom: 20,
        marginRight: 20,
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
        marginTop: 40
    },
    bikelogo: {
        backgroundColor: '#2FD175',
        marginBottom: 20,
        marginRight: 20,
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
    speedometer: {
        position: 'absolute',
        left: 20,
        bottom: 40,
        width: Dimensions.get('window').width * 0.15,
        height: Dimensions.get('window').width * 0.15,
        backgroundColor: "white",
        justifyContent: 'center',
        borderRadius: 30,
        borderColor: "#2FD175",
        borderWidth: 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        elevation: 13,
    },
    kmh: {
        fontSize: 9
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
            trace_db: props.trace_db,
            locked: false,
            spinner: false,
            showLocation: false,
            speed: null
        };
        this.getLocationAsync.bind(this);
        this.loadTrace.bind(this);
        this.unlockView.bind(this);
        this.cameraSet.bind(this);
    }

    loadTrace = (name) => {
        let trace = null;
        if (name === this.state.trace_id) {
            this.setState({trace: null, trace_id: null})
        }
        else {
            this.setState({spinner: true})
            console.log("querying database for a new trace " + name);
            this.state.trace_db.transaction(tx => {
                tx.executeSql("SELECT * FROM " + name + " ;", null ,
                (txObj, { rows: { _array } }) => {
                    console.log("query successfull")
                    this.setState({trace: _array, trace_id: name})
                },
                (txObj, error) => console.log("Error ", error))
            this.setState({spinner: false})
            })
        }
    }

    getLocationPermission = async () => {
        const {status} = await Permissions.getAsync(Permissions.LOCATION);
        console.log(status)
        if(status !== 'granted')
        {
            const {status} = await Permissions.askAsync(Permissions.LOCATION);
            if(status === 'denied')
            {
                Alert.alert("Location Permission", "To use fully our app we need to have access to your location.")
            }
        }
    }

    getLocationAsync = async (pressed) => {
        const {status} = await Permissions.getAsync(Permissions.LOCATION);
        if(status === 'granted')
        {
            if(pressed && this.state.showLocation === false) this.state.showLocation = true;
            let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.BestForNavigation});
            const {latitude, longitude} = location.coords;
            this.setState({location: {latitude, longitude}});
            if (pressed) {
                this.state.showLocation = true;
                this.state.locked = false;
                const newCamera = {
                    center: {latitude: latitude, longitude: longitude},
                    zoom: 15,
                    heading: 0,
                    pitch: 0,
                    altitude: 5
                }
                this._map.animateCamera(newCamera, {duration: 2000});
            }
        }
        else
            this.getLocationPermission();
    }

    followPerson = async () => {
        if(this.state.locked){
            this.setState({locked: false});
        }
        else
        {
            const {status} = await Permissions.getAsync(Permissions.LOCATION);
            if(status === 'granted')
            {
                this.setState({locked: true, showLocation: true})
                Location.watchPositionAsync( {accuracy: Location.Accuracy.BestForNavigation , timeInterval:200 } , (loc) =>  this.cameraSet(loc));
            }
            else
                this.getLocationPermission()
        }
    }

    cameraSet = (location) => {
        if(this.state.locked){
            const {latitude, longitude} = location.coords;
            this.setState({location: {latitude, longitude}, speed: Math.round((location.coords.speed*3.6), 1)});
            const newCamera = {
                center: {latitude: latitude, longitude: longitude},
                zoom: 17,
                heading: location.coords.heading,
                pitch: 45,
                altitude: 1
            }
            if(this._map != null)
                this._map.animateCamera(newCamera, {duration: 200});
        }
    }

    unlockView = () => {
        if(this.state.locked)
        {
            this.setState({locked: false})
        }
    }

    componentDidUpdate = () => {
        if(this.state.location && !this.state.locked){
            this.getLocationAsync()
        }
    }

    render() {
        if(this.state.trace != null) {
            console.log("Rendering trace")
        }
        return (

            <View style={styles.container}>
                            <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={{color: '#FFF'}}
                    animation="slide"

                />
                <MapView
                    style={styles.map}
                    ref={component => this._map = component}
                    onPanDrag = {() => this.unlockView()}
                >

                    {this.state.showLocation && this.state.location && <Marker coordinate={this.state.location} flat anchor={{x: 0.5, y: 0.5}}>
                        <View>
                            <PositionLogo/>
                        </View>
                    </Marker>}

                    {this.state.trace != null &&
                    // #2FD175
                    <Polyline coordinates={this.state.trace} strokeWidth={2} strokeColor={"#4f6dde"}/>}
                </MapView>

                <View style={styles.roadselector}>
                    <RoadSelector callback={this.loadTrace} />
                </View>

                <View style={styles.container}>
                    {this.state.locked && this.state.speed != null &&
                        <View style={styles.speedometer}>
                            <Text style={{alignSelf: 'center'}}>{this.state.speed} <Text style={styles.kmh}>km/h</Text></Text>
                        </View>
                    }
                    <TouchableOpacity
                        onPress={() => {
                            this.getLocationAsync(true);
                        }}
                        style={(this.state.showLocation) ? styles.locationlogo : [styles.locationlogo, styles.inactive]}
                    >
                        <LocationLogo width={25} height={25} fill={"white"}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.followPerson}
                        style={(this.state.locked) ? styles.locationlogo : [styles.bikelogo, styles.inactive]}
                    >
                        <Bicycle width={25} height={25}  fill={"white"}/>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

export default HomeScreen;
