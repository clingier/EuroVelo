import React from 'react';
import {Platform, Alert, Button, StyleSheet, ScrollView, Image, Text, View} from 'react-native';
import pic from '../../assets/images/ev.jpg';
import {useState, Component, ImageBackground} from "react-native-web";
import {TouchableHighlight} from "react-native-gesture-handler";

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
            <Image style={{width: '100%', height: '35%'}} source={pic}/>
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
