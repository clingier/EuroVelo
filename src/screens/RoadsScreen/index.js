import * as React from 'react';
import Description from '../Description';
import {Dimensions, StyleSheet, ScrollView, Image, Text, View} from 'react-native';
import pic from '../../assets/images/ev.jpg';
import {TouchableHighlight} from 'react-native-gesture-handler';
import routes from '../../assets/roads_data/roads.json';
import {createStackNavigator} from "@react-navigation/stack";
import MaskedView from '@react-native-community/masked-view';

const Stack = createStackNavigator();

/*
ECRAN AVEC TOUTES LES ROUTES <3
*/

const scaleFactor = 1920 / Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: '2%',
        overflow:"visible",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FAFCFF',
        width: '100%',
    },

    title: {
        marginTop: 46,
        fontSize: 24,
        color: '#3D3F43'
    },

    velo: {
        color: '#17AC40',
        fontWeight: 'bold'
    },

    subtitle: {
        marginTop: 30,
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
        marginVertical: 10,
        justifyContent: 'center',
        borderRadius: 8,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
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
        fontSize: 18
    },
    evRoute:{
        color: "#80848A",
        fontSize: 12
    }
});

const Buttons = ({navigation}) => {
    const buttons = [];
    for (let i = 0; i < 17; i++) {
        buttons.push(
            <TouchableHighlight
                key={i}
                onPress={() => navigation.navigate('Description', {
                    number: routes[i].id,
                    name: routes[i].title,
                    description: routes[i].description
                })}>
                <View style={styles.scrollElem}>
                    <MaskedView
                        maskElement={
                            <View
                                style={{
                                    width:  0.9 * Dimensions.get('window').width,
                                    height: 150,
                                    backgroundColor: 'black',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                            </View>
                        }
                    >
                        <Image source={pic} style={styles.image}/>
                    </MaskedView>

                    <View style={styles.evInfo}>
                        <Text style={styles.evTitle}>{routes[i].title}</Text>
                        <Text style={styles.evRoute}>Route {routes[i].id}</Text>
                    </View>
                </View>
            </TouchableHighlight>
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
