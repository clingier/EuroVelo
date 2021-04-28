import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {CheckBox} from "react-native-elements";
import pic from '../../assets/images/ev.jpg';



export default class Screen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            check: [],
            organisation_db: props.organisation_db,
            date: this.getDateCode(),
            first_time: 1
        };
    }

    getDateCode() {
        const date = new Date().getDate();
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        return year * 10000 + month * 100 + date;
    }

    days = ["Today", "Tomorrow", "In two days"]

    setCheck(which_box, yes_or_no, date) {
        /* which box : "Breakfast" or "Dinner" or "Supper" or "Sleeping place" */
        if (which_box === "Breakfast") {
            this.state.organisation_db.transaction((tx) => {
                tx.executeSql(
                    'UPDATE Check_list SET Breakfast = ? WHERE Date = ?;',
                    [yes_or_no, date],
                    (tx, results) => {
                    });
            });
        } else if (which_box === "Dinner") {
            this.state.organisation_db.transaction((tx) => {
                tx.executeSql(
                    'UPDATE Check_list SET Dinner = ? WHERE Date = ?;',
                    [yes_or_no, date],
                    (tx, results) => {
                    });
            });
        } else if (which_box === "Supper") {
            this.state.organisation_db.transaction((tx) => {
                tx.executeSql(
                    'UPDATE Check_list SET Supper = ? WHERE Date = ?;',
                    [yes_or_no, date],
                    (tx, results) => {
                    });
            });
        } else if (which_box === "Sleeping place") {
            this.state.organisation_db.transaction((tx) => {
                tx.executeSql(
                    'UPDATE Check_list SET "Sleeping place" = ? WHERE Date = ?;',
                    [yes_or_no, date],
                    (tx, results) => {
                    });
            });
        }

    }

    render() {
        /* on va récupérer les checkboxes déjà cochées dans la db */
        if (this.state.first_time) {
            this.setState({first_time: 0});

            this.state.organisation_db.transaction((tx) => {
                tx.executeSql(
                    'DELETE FROM Check_list WHERE Date < ?;',
                    [this.state.date],
                    (tx, results) => {
                    }
                );
            });

            for (let i = 0; i < 3; i++) {
                this.state.organisation_db.transaction((tx) => {
                    tx.executeSql(
                        'SELECT * FROM Check_list WHERE Date == ?;',
                        [this.state.date + i],
                        (tx, results) => {
                            if (results.rows.length > 0) {
                                let res = results.rows.item(0);
                                const my_check = this.state.check;
                                my_check[4 * i] = res["Breakfast"];
                                my_check[4 * i + 1] = res["Dinner"];
                                my_check[4 * i + 2] = res["Supper"];
                                my_check[4 * i + 3] = res["Sleeping place"];


                                this.setState({check: my_check})
                            } else {
                                this.state.organisation_db.transaction((tx) => {
                                    tx.executeSql(
                                        'INSERT INTO "Check_list"\n' +
                                        '("Breakfast", "Dinner", "Supper", "Sleeping place", "Date")\n' +
                                        'VALUES (0, 0, 0, 0, ?);',
                                        [this.state.date + i],
                                        (tx, results) => {
                                        }
                                    );
                                });
                            }
                        }
                    );
                });
            }
        }

        // on crée les checkboxes
        const Buttons = () => {
            const buttons = [];
                for (let i = 0; i < 3; i++) {
                    buttons.push(
                        <View key={i}>
                            <Text style={styles.second_title}>{this.days[i]}</Text>

                            <View style={styles.row}>
                                    <View style={styles.checkbox}>
                                        <CheckBox
                                            title='Breakfast'
                                            checkedColor="#2FD175"
                                            checked={this.state.check[4 * i]} // 4*i pour atteindre la bonne checkbox
                                            textStyle={styles.textButton}
                                            onPress={() => {
                                                let my_check = this.state.check;
                                                my_check[4 * i] = !my_check[4 * i];
                                                this.setState({check: my_check})
                                                this.setCheck("Breakfast", my_check[4 * i], this.state.date + i);
                                            }}
                                        />
                                    </View>
                                    <View style={styles.checkbox}>
                                        <CheckBox
                                            title='Dinner'
                                            checkedColor="#2FD175"
                                            checked={this.state.check[4 * i + 1]}
                                            textStyle={styles.textButton}
                                            onPress={() => {
                                                let my_check = this.state.check;
                                                my_check[4 * i + 1] = !my_check[4 * i + 1];
                                                this.setState({check: my_check});
                                                this.setCheck("Dinner", my_check[4 * i + 1], this.state.date + i);
                                            }}
                                        />
                                    </View>
                                </View>


                            <View style={styles.row}>
                                    <View style={styles.checkbox}>
                                        <CheckBox
                                            title='Supper'
                                            checkedColor="#2FD175"
                                            checked={this.state.check[4 * i + 2]} // 4*i pour atteindre la bonne checkbox
                                            textStyle={styles.textButton}
                                            onPress={() => {
                                                let my_check = this.state.check;
                                                my_check[4 * i + 2] = !my_check[4 * i + 2];
                                                this.setState({check: my_check})
                                                this.setCheck("Supper", my_check[4 * i + 2], this.state.date + i);
                                            }}
                                        />
                                    </View>
                                    <View style={styles.checkbox}>
                                        <CheckBox
                                            title='Sleeping place'
                                            checkedColor="#2FD175"
                                            checked={this.state.check[4 * i + 3]}
                                            containerStyle={styles.Button}
                                            textStyle={styles.textButton}
                                            onPress={() => {
                                                let my_check = this.state.check;
                                                my_check[4 * i + 3] = !my_check[4 * i + 3];
                                                this.setState({check: my_check});
                                                this.setCheck("Sleeping place", my_check[4 * i + 3], this.state.date + i);
                                            }}
                                        />
                                    </View>
                            </View>

                        </View>
                    );
                }
            //
            return buttons;
        };

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.little_first}>
                    <Text style={styles.title}>Organisation</Text>
                </View>
                <View style={styles.little_second}>
                    {Buttons()}
                </View>
                <View style={styles.little_third}>
                    <Image source={pic} style={styles.image} resizeMode={'cover'}/>
                </View>
            </SafeAreaView>

        );
    }
}
//                    {Buttons()}
//                        <Image source={pic} style={styles.image} resizeMode={'cover'}/>
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: '5%'
    },
    separator: {
        height: 1,
    },

    title: {
        paddingTop:'3%',
        paddingHorizontal: '5%',
        fontSize: Dimensions.get("window").height*0.055,
        fontWeight: 'bold',
        color:"#2FD175",
    },
    little_first: {
    },
    little_second: {
        marginBottom: '5%'
    },
    little_third: {
        flex: 1,
        marginHorizontal: "3%",
        marginTop: 0,
        marginBottom: 0,
    },
    second_title: {
        fontSize: Dimensions.get("window").height*0.021,
        fontWeight: 'bold',
        paddingLeft: '5%',
        marginTop: '2%',
        marginBottom: '2%'
    },

    row: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginVertical: '-1%',
    },

    checkbox: {
        marginHorizontal: '-2%',
        width: '50%',
    },
    image: {

        direction:'ltr',
        borderRadius: 30,
        overflow:'hidden',
        bottom:0,
        height: '100%',
        width: '100%',
        marginTop: '-2%',
    },
    textButton: {
        fontSize: Dimensions.get("window").height*0.019,
    }
});