import React, {Component} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {CheckBox} from "react-native-elements";
import {TouchableHighlight} from "react-native-gesture-handler";
import routes from "../../assets/roads_data/roads.json";
import pic from "../../assets/images/ev.jpg";

export default class Screen extends Component {
    state = {
        check: []
    }

    days = ["Today", "Tomorrow", "In two days"]

    render() {
        const Buttons = () => {
            const buttons = [];
            for (let i = 0; i < 3; i++) {
                buttons.push(<Text style={styles.second_title}>{this.days[i]}</Text>)
                buttons.push(
                    <View style={styles.row}>
                        <View style={styles.checkbox}>
                            <CheckBox
                                title='Breakfast'
                                checkedColor='green'
                                checked={this.state.check[4 * i]} // 4*i pour atteindre la bonne checkbox
                                onPress={() => {
                                    let my_check = this.state.check;
                                    my_check[4 * i] = !my_check[4 * i];
                                    this.setState({check: my_check})
                                }}
                            />
                        </View>
                        <View style={styles.checkbox}>
                            <CheckBox
                                title='Dinner'
                                checkedColor='green'
                                checked={this.state.check[4 * i + 1]}
                                onPress={() => {
                                    let my_check = this.state.check;
                                    my_check[4 * i + 1] = !my_check[4 * i + 1];
                                    this.setState({check: my_check})
                                }}
                            />
                        </View>
                    </View>
                );
                buttons.push(
                    <View style={styles.row}>
                        <View style={styles.checkbox}>
                            <CheckBox
                                title='Supper'
                                checkedColor='green'
                                checked={this.state.check[4 * i + 2]}
                                onPress={() => {
                                    let my_check = this.state.check;
                                    my_check[4 * i + 2] = !my_check[4 * i + 2];
                                    this.setState({check: my_check})
                                }}
                            />
                        </View>
                        <View style={styles.checkbox}>
                            <CheckBox
                                title='Sleeping place'
                                checkedColor='green'
                                checked={this.state.check[4 * i + 3]}
                                onPress={() => {
                                    let my_check = this.state.check;
                                    my_check[4 * i + 3] = !my_check[4 * i + 3];
                                    this.setState({check: my_check})
                                }}
                            />
                        </View>
                    </View>
                );
            }
            return buttons;
        }

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Organisation</Text>
                {Buttons()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    },

    title: {
        marginTop: 30,
        fontSize: 50,
        fontWeight: 'bold',
    },

    second_title: {
        fontSize: 30,
        fontWeight: 'normal'
    },

    separator: {
        marginVertical: 10,
        height: 1,
        width: '80%',
    },

    row: {
        justifyContent: 'center',
        flexDirection: 'row',
        height: 50,
    },

    checkbox: {
        width: '50%'
    }
});
