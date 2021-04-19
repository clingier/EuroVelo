import React from 'react'
import {View, ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native'
import CrossSvg from '../../assets/svg/cross.svg';

const styles = StyleSheet.create({
    button: {
        marginHorizontal: 7,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: "#CACACA"
    },
    buttonText: {
        color: "white",

    },
    active: {
        backgroundColor: "#2FD175"
    },
})

class RoadSelector extends React.Component {
    constructor(props) {
        super(props);
        let roads = {
            'ev1' : './maps_data/eurovelo1.json',
            'ev2' : './maps_data/eurovelo2.json',
            'ev3' : './maps_data/eurovelo3.json',
            'ev4' : './maps_data/eurovelo4.json',
            'ev5' : './maps_data/eurovelo5.json',
            'ev6' : './maps_data/eurovelo6.json',
            'ev7' : './maps_data/eurovelo7.json',
            'ev8' : './maps_data/eurovelo8.json',
            'ev9' : './maps_data/eurovelo9.json',
            'ev10' : './maps_data/eurovelo10.json',
            'ev11' : './maps_data/eurovelo11.json',
            'ev12' : './maps_data/eurovelo12.json',
            'ev13' : './maps_data/eurovelo13.json',
            'ev14' : './maps_data/eurovelo14.json',
            'ev15' : './maps_data/eurovelo15.json',
            'ev17' : './maps_data/eurovelo17.json',
            'ev19' : './maps_data/eurovelo19.json',
        }

        this.state = { callback: props.callback, roads: roads, active: null }
        this.changeActive.bind(this);
    }

    changeActive(name){
        if(this.state.active === name)
            this.setState({active: null})
        else
            this.setState({active: name})
        this.state.callback(name);
    }

    render(){
        const roadbutton = (name) => {
            return (
            <TouchableOpacity
            style={(name === this.state.active) ? [styles.button, styles.active] : styles.button}
            onPress={() => {this.changeActive(name)}}>
                <Text
                style={styles.buttonText}>
                    {name}{name === this.state.active && "  "}
                    {name === this.state.active && <CrossSvg width={10} height={10} fill={"white"}/>}
                </Text>
            </TouchableOpacity>)
        }

        const roadnames = Object.keys(this.state.roads);

        return (
            <ScrollView horizontal={true}>
                {this.state.active && roadbutton(this.state.active)}
                {roadnames.filter((value) => {return this.state.active !== value}).map((value, index) => {
                    return <View key={index}>{roadbutton(value)}</View>;
                })}
            </ScrollView>
        );
    }
  }

export default RoadSelector;
