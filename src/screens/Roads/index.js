import * as React from 'react';
import {Alert, Button, StyleSheet, ScrollView, Image, Text, View} from 'react-native';
import pic from '../../assets/images/ev.jpg';
import {TouchableHighlight} from 'react-native-gesture-handler';

const Buttons = ({navigation}) => {
    const buttons = [];
    for (let i = 1; i <= 19; i++) {
        if (i === 16 || i === 18) continue;
        buttons.push(
            <TouchableHighlight
                onPress={() => navigation.navigate('Description', {number: i, name: 'Atlantic Coast Route'})}>
                <View style={styles.scrollElem}>
                    <Image source={pic} style={styles.image}/>
                    <View style={styles.evInfo}>
                        <Text style={styles.evView}>EV{i}</Text>
                        <Text style={styles.evView}>1000 km</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
    return buttons;
}

const Roads = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Eurovelo</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
            <ScrollView>
                {Buttons({navigation})}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    title: {
        marginTop: 10,
        fontSize: 50,
        fontWeight: 'bold',
    },

    separator: {
        marginVertical: 10,
        height: 1,
        width: '80%',
    },
    scrollElem: {
        justifyContent: 'center'

    },

    image: {
        height: 200,
        width: 400,

    },

    evInfo: {
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#d3d3d3',
    },

    evView: {
        fontSize: 30,
        justifyContent: 'space-around',
        paddingLeft: 50,
        paddingRight: 80,
    }
});

export default Roads;
