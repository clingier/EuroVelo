import React from 'react';
import {Platform, Alert, Button, StyleSheet, ScrollView, Image, Text, View} from 'react-native';
import pic from '../../assets/images/ev.jpg';
import {useState, Component, ImageBackground} from "react-native-web";
import {TouchableHighlight} from "react-native-gesture-handler";
import pic1 from '../../assets/images/eurovelo1.jpg';
import pic2 from '../../assets/images/eurovelo2.jpg';
import pic3 from '../../assets/images/eurovelo3.jpg';
import pic4 from '../../assets/images/eurovelo4.jpg';
import pic5 from '../../assets/images/eurovelo5.jpg';
import pic6 from '../../assets/images/eurovelo6.jpg';
import pic7 from '../../assets/images/eurovelo7.jpg';
import pic8 from '../../assets/images/eurovelo8.jpg';
import pic9 from '../../assets/images/eurovelo9.jpg';
import pic10 from '../../assets/images/eurovelo10.jpg';
import pic11 from '../../assets/images/eurovelo11.jpg';
import pic12 from '../../assets/images/eurovelo12.jpg';
import pic13 from '../../assets/images/eurovelo13.jpg';
import pic14 from '../../assets/images/eurovelo14.jpg';
import pic15 from '../../assets/images/eurovelo15.jpg';
import pic16 from '../../assets/images/eurovelo16.jpg';
import pic17 from '../../assets/images/eurovelo17.jpg';
const pics = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9, pic10, pic11, pic12, pic13, pic14, pic15, pic16, pic16, pic17, pic17];


const Description = ({navigation, route}) => {
    if (typeof route.params === "undefined")
        return (
            <View style={[styles.container, {}]}>
                <Image style={{width: '100%', height: '35%'}} source={pic}/>
                <View style={{flex: 1, backgroundColor: "white"}}>
                    <Text style={styles.titleText}>
                        Please select a route
                    </Text>
                </View>
            </View>
        );
    else return (
        <View style={[styles.container, {}]}>
            <Image style={{width: '100%', height: '35%'}} source={pics[route.params.number-1]}/>
            <ScrollView>

                <View style={{flex: 1, backgroundColor: "white"}}>
                    <Text style={styles.routeText}>
                        Route {route.params.number}
                    </Text>
                    <Text style={styles.titleText}>
                        {route.params.name}
                    </Text>

                    <Text style={styles.description}>
                        {route.params.description}
                    </Text>
                </View>


                <TouchableHighlight
                    onPress={() => navigation.navigate('Map')}>
                    <View style={styles.scrollElem}>
                        <View style={styles.evInfo}>
                            <Text style={styles.evView}>Go to map</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    box: {
        backgroundColor: "black",
        height: 50,
        width: 100
    },
    container: {
        flex: 1,
        paddingTop: 25
    },
    description: {
        padding: 20
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    image: {
        height: "100%",
        width: "100%"
    },
    kilometers: {
        fontSize: 15,
        top: 10,
    },
    routeText: {
        fontSize: 25,
        color: 'yellowgreen',
        top: 10,
        left: 20
    },
    titleText: {
        fontSize: 30,
        top: 10,
        left: 20
    }
});


export default Description;
