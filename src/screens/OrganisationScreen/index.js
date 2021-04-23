import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CheckBox} from "react-native-elements";


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
                                    checkedColor='green'
                                    checked={this.state.check[4 * i]} // 4*i pour atteindre la bonne checkbox
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
                                    checkedColor='green'
                                    checked={this.state.check[4 * i + 1]}
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
                                    checkedColor='green'
                                    checked={this.state.check[4 * i + 2]} // 4*i pour atteindre la bonne checkbox
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
                                    checkedColor='green'
                                    checked={this.state.check[4 * i + 3]}
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
            return buttons;
        };

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
