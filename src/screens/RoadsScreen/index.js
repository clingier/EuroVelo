import * as React from 'react';
import Description from '../Description';
import {Dimensions, StyleSheet, ScrollView, Image, Text, View} from 'react-native';
// import pic1 from '../../assets/images/eurovelo1.jpg';
// import pic2 from '../../assets/images/eurovelo2.jpg';
// import pic3 from '../../assets/images/eurovelo3.jpg';
// import pic4 from '../../assets/images/eurovelo4.jpg';
// import pic5 from '../../assets/images/eurovelo5.jpg';
// import pic6 from '../../assets/images/eurovelo6.jpg';
// import pic7 from '../../assets/images/eurovelo7.jpg';
// import pic8 from '../../assets/images/eurovelo8.jpg';
// import pic9 from '../../assets/images/eurovelo9.jpg';
// import pic10 from '../../assets/images/eurovelo10.jpg';
// import pic11 from '../../assets/images/eurovelo11.jpg';
// import pic12 from '../../assets/images/eurovelo12.jpg';
// import pic13 from '../../assets/images/eurovelo13.jpg';
// import pic14 from '../../assets/images/eurovelo14.jpg';
// import pic15 from '../../assets/images/eurovelo15.jpg';
// import pic16 from '../../assets/images/eurovelo16.jpg';
// import pic17 from '../../assets/images/eurovelo17.jpg';
// const pics = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9, pic10, pic11, pic12, pic13, pic14, pic15, pic16, pic17];

const pics = [
    require('../../assets/images/eurovelo1.jpg'),
    require('../../assets/images/eurovelo2.jpg'),
    require('../../assets/images/eurovelo3.jpg'),
    require('../../assets/images/eurovelo4.jpg'),
    require('../../assets/images/eurovelo5.jpg'),
    require('../../assets/images/eurovelo6.jpg'),
    require('../../assets/images/eurovelo7.jpg'),
    require('../../assets/images/eurovelo8.jpg'),
    require('../../assets/images/eurovelo9.jpg'),
    require('../../assets/images/eurovelo10.jpg'),
    require('../../assets/images/eurovelo11.jpg'),
    require('../../assets/images/eurovelo12.jpg'),
    require('../../assets/images/eurovelo13.jpg'),
    require('../../assets/images/eurovelo14.jpg'),
    require('../../assets/images/eurovelo15.jpg'),
    require('../../assets/images/eurovelo16.jpg'),
    require('../../assets/images/eurovelo17.jpg'),
]

import {TouchableHighlight} from 'react-native-gesture-handler';
import routes from '../../assets/roads_data/roads.json';
import {createStackNavigator} from "@react-navigation/stack";
import MaskedView from '@react-native-community/masked-view';
import {Asset} from 'expo-asset'

const Stack = createStackNavigator();

/*
ECRAN AVEC TOUTES LES ROUTES <3
*/

const scaleFactor = 1920 / Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FAFCFF',
    },

    title: {
        marginLeft: '2%',
        marginTop: '10%',
        fontSize: 24,
        color: '#3D3F43'
    },

    velo: {
        color: '#17AC40',
        fontWeight: 'bold'
    },

    subtitle: {
        marginTop: "8%",
        marginLeft: "2%",
        fontSize: 18,
        fontWeight: 'bold',
        color: "#3D3F43"
    },

    separator: {
        marginVertical: 10,
        height: 1,
        width: '80%',
    },

    scrollElem: {
        marginVertical: "3%",
        width: '97%',
        borderRadius: 8,
        alignSelf: 'center',
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        
        elevation: 7,
    },

    image: {
        height: 0.9 * 1080 / scaleFactor,
        width: 0.9 * Dimensions.get('window').width
    },

    evInfo: {
        position: 'absolute',
        top: 150,
        left: 0,
        right: 0,
        bottom: 0,
        paddingLeft: 38,
        paddingTop: 10,
        backgroundColor: 'white'
    },
    evTitle: {
        color: "#3D3F43",
        fontWeight: '600',
        fontSize: 16
    },
    evRoute:{
        color: "#80848A",
        fontSize: 8
    }
});

const Buttons = ({navigation}) => {
    const buttons = [];
    for (let i = 0; i < 17; i++) {
        buttons.push(
            <View key={i}>
                <TouchableHighlight onPress={() => navigation.navigate('Description', {
                            number: routes[i].id,
                            name: routes[i].title,
                            description: routes[i].description
                        })} style={styles.scrollElem}>
                            <View>
                                <Image source={Asset.fromModule(pics[i])} style={styles.image}/>
                            <View style={styles.evInfo}>
                                <Text style={styles.evTitle}>{routes[i].title}</Text>
                                <Text style={styles.evRoute}>Route {routes[i].id}</Text>
                            </View>
                            </View>
                </TouchableHighlight>
            </View>
        );
    }
    return buttons;
}


const RoadsScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <ScrollView>
               <Text style={styles.title}>euro.<Text style={styles.velo}>Velo</Text></Text>
               <Text style={styles.subtitle}>The Routes</Text>
                {Buttons({navigation})}
            </ScrollView>
        </View>
    )
}

/*
WRAPPER DE L'ECRAN AVEC TOUTES LES ROUTES POUR LA NAVIGATION<3
*/

const RoadsScreenStackOptions = {
    header: () => {return(<View/>)} // NO header
}

const Roads = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Roads" component={RoadsScreen} options={RoadsScreenStackOptions}/>
            <Stack.Screen name="Description" component={Description} />
        </Stack.Navigator>
    );
}

export default Roads;
