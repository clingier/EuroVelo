import React from 'react';
import {Dimensions, Button, StyleSheet, ScrollView, Image, Text, View} from 'react-native';
import pic from '../../assets/images/ev.jpg';
import {useState, Component, ImageBackground} from "react-native-web";
import {TouchableOpacity} from "react-native-gesture-handler";
import {LinearGradient} from "expo-linear-gradient";
import LeftArrow from '../../assets/svg/left-arrow.svg';
import KmArrow from '../../assets/svg/km-arrow.svg';
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
import { TabRouter } from '@react-navigation/routers';
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
        <View style={[styles.container]}>
            <ScrollView>
                <View style={styles.imageContainer}>
                    <View style={styles.backButton}>
                        <TouchableOpacity  onPress={() => navigation.goBack()}>
                                <LeftArrow width={22} height={22} fill={"#FBFCFF"}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.kmOverlay}>
                        <KmArrow style={styles.kmArrow} width={15} height={18} fill={"#FBFCFF"} />
                        <Text style={styles.kmText}> {route.params.km} km</Text>
                    </View>
                    <Image style={styles.mainImage} source={pics[route.params.number-1]}/>
                    <View style={styles.overlay} />
                </View>
                    <View style={styles.banner}>
                        <Text style={styles.routeText}>
                            Route {route.params.number}
                        </Text>
                        <Text style={styles.titleText}>
                            {route.params.name}
                        </Text>
                    </View>
                    <View style={styles.descriptionContainer}>
                        <LinearGradient
                                // Background Linear Gradient
                                colors={['#F3F8FF', 'white']}
                                style={styles.gradientBackground}
                        />                        
                        <Text style={styles.description}>
                            {route.params.description}
                        </Text>
                    </View>
            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width
    },
    imageContainer: {
        height: Dimensions.get('window').height * 0.5,
        width: Dimensions.get('window').width,
    },
    mainImage: {
        height: Dimensions.get('window').height * 0.5,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(97,103,116,0.10)'
    },
    banner: {
        paddingLeft: 20,
        paddingTop: 10,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.1,
        backgroundColor: 'white'
    },
    routeText: {
        color: "#17AC40",
        fontSize: 16,
        fontWeight: 'bold'
    },
    titleText: {
        fontSize: 19,
        color: "#3D3F43",
    },
    descriptionContainer: {
        width: Dimensions.get('window').width,
        paddingTop: 15,
        paddingHorizontal: 20,
    },
    description: {
        fontSize: 14,
        color: "#3D3F43",
        lineHeight: 20,
    },
    gradientBackground: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: "120%"
    },
    backButton: {
        position: 'absolute',
        top: Dimensions.get('window').height * 0.07,
        left: 20,
        zIndex: 1
    },
    kmOverlay: {
        flexDirection: 'row',
        position: 'absolute',
        top: Dimensions.get('window').height * 0.07,
        right: 20,
        zIndex: 1,
        padding:5,
        borderRadius: 8,
        backgroundColor: "rgba(97, 103, 116, 0.8)"
    },
    kmText: {
        color: "#FBFCFF"
    },
    kmArrow: {
        transform: [{ rotate: '-50deg'}]
    }
});


export default Description;
