import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {CheckBox} from "react-native-elements";
import pic from '../../assets/images/ev.jpg';
import * as SQLite from 'expo-sqlite';


export default class Screen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            check: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            date_codes: this.getDateCodes(),
            first_time: 1,
            checkChanged: false
        };
        this.updateDb.bind(this);
    }

    getDateCodes() {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const inTwoDays = new Date(today);
        inTwoDays.setDate(inTwoDays.getDate() + 2);

        const codes = [];
        codes[0] = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
        codes[1] = tomorrow.getFullYear() * 10000 + (tomorrow.getMonth() + 1) * 100 + tomorrow.getDate();
        codes[2] = inTwoDays.getFullYear() * 10000 + (inTwoDays.getMonth() + 1) * 100 + inTwoDays.getDate();

        return codes;
    }

    days = ["Today", "Tomorrow", "In two days"]

    // setCheck(which_box, yes_or_no, date) {
    //     /* which box : "Breakfast" or "Dinner" or "Supper" or "Sleeping place" */
    //     if (which_box === "Breakfast") {
    //         this.state.organisation_db.transaction((tx) => {
    //             tx.executeSql(
    //                 'UPDATE Check_list SET Breakfast = ? WHERE Date = ?;',
    //                 [yes_or_no, date],
    //                 (tx, results) => {
    //                     console.log(results.rowsAffected + " line(s) in the database were changed to " + yes_or_no + ".");
    //                 });
    //         });
    //     } else if (which_box === "Dinner") {
    //         this.state.organisation_db.transaction((tx) => {
    //             tx.executeSql(
    //                 'UPDATE Check_list SET Dinner = ? WHERE Date = ?;',
    //                 [yes_or_no, date],
    //                 (tx, results) => {
    //                     // alert(results.rowsAffected + " line(s) in the database were changed.");
    //                 });
    //         });
    //     } else if (which_box === "Supper") {
    //         this.state.organisation_db.transaction((tx) => {
    //             tx.executeSql(
    //                 'UPDATE Check_list SET Supper = ? WHERE Date = ?;',
    //                 [yes_or_no, date],
    //                 (tx, results) => {
    //                     // alert(results.rowsAffected + " line(s) in the database were changed.");
    //                 });
    //         });
    //     } else if (which_box === "Sleeping place") {
    //         this.state.organisation_db.transaction((tx) => {
    //             tx.executeSql(
    //                 'UPDATE Check_list SET "Sleeping place" = ? WHERE Date = ?;',
    //                 [yes_or_no, date],
    //                 (tx, results) => {
    //                     // alert(results.rowsAffected + " line(s) in the database were changed.");
    //                 });
    //         });
    //     }

    // }

    componentDidMount = async () => {
        /* on va récupérer les checkboxes déjà cochées dans la db */
        const db = SQLite.openDatabase('organisation_db.db')
        try {
            await new Promise((resolve, reject) => {
                db.transaction((tx) => {
                    tx.executeSql(
                        'DELETE FROM Check_list WHERE Date < ?;',
                        [this.state.date_codes[0]],
                        (tx, results) => {
                        }
                    );
                    for (let i = 0; i < 3; i++) {
                        tx.executeSql(
                            'SELECT * FROM Check_list WHERE Date == ?;',
                            [this.state.date_codes[i]],
                            (tx, results) => {
                                if (results.rows.length > 0) {
                                    let res = results.rows.item(0);
                                    this.state.check[4 * i] = res["Breakfast"];
                                    this.state.check[4 * i + 1] = res["Dinner"];
                                    this.state.check[4 * i + 2] = res["Supper"];
                                    this.state.check[4 * i + 3] = res["Sleeping place"];
                                    this.setState({check: this.state.check, checkChanged: false})
                                } else {
                                    this.state.check[4 * i] = 0;
                                    this.state.check[4 * i + 1] = 0;
                                    this.state.check[4 * i + 2] = 0;
                                    this.state.check[4 * i + 3] = 0;
                                    this.state.checkChanged = false;
                                }
                            }
                        );
                    }
                },
                reject,
                resolve);
            })
        } catch(error) {
            console.error(error)
        } finally {
            if(db != null)
                db._db.close();
            console.log("Component Did mount here is the state:")
            console.log(this.state.check)
        }
    }

    
    // on crée les checkboxes
    Buttons() {
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
                                    let check = this.state.check;
                                    check[4 * i] = (check[4 * i]) ? 0 : 1;
                                    this.setState({check: check, checkChanged: true});
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
                                    let check = this.state.check;
                                    check[4 * i + 1] = (check[4 * i + 1]) ? 0 : 1;
                                    this.setState({check: check, checkChanged: true});
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
                                    let check = this.state.check;
                                    check[4 * i + 2] = (check[4 * i + 2]) ? 0 : 1;
                                    this.setState({check: check, checkChanged: true});
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
                                    let check = this.state.check;
                                    check[4 * i + 3] = (check[4 * i + 3]) ? 0 : 1;
                                    this.setState({check: check, checkChanged: true});
                                }}
                            />
                        </View>
                    </View>
                </View>
            );
        }
        
        return buttons;
    };

    render() {

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.little_first}>
                    <Text style={styles.title}>Organisation</Text>
                </View>
                <View style={styles.little_second}>
                    {this.Buttons()}
                </View>
                <View style={styles.little_third}>
                    <Image source={pic} style={styles.image} resizeMode={'cover'}/>
                </View>
            </SafeAreaView>

        );
    }

    updateDb = async () => {
        if(this.state.checkChanged) {
            console.log("updating db")
            const db = SQLite.openDatabase('organisation_db.db')
            try {
                await new Promise((resolve, reject) => {
                    db.transaction((tx) => {
                            for(let i=0; i < 3; i++){
                                tx.executeSql(
                                    'replace into Check_list(Breakfast, Dinner, Supper, "Sleeping place", "Date") values (?, ?, ?, ?, ?)',
                                    this.state.check.slice(4 * i, 4 * i + 4).concat([this.state.date_codes[i]]),
                                    (tx, results) => {
                                    },
                                    (tx, error) => console.warn(error)
                                );
                            }
                    },
                    reject,
                    resolve)
                });
            } catch (err) {
                console.log(err);
            } finally {
                if(db != null)
                    db._db.close();
            }
            this.state.checkChanged = false;
        }
    }

    componentDidUpdate = () => {
        this.updateDb();
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: '5%'
    },
    separator: {
        height: 1,
    },

    title: {
        paddingTop: '3%',
        paddingHorizontal: '5%',
        fontSize: Dimensions.get("window").height * 0.055,
        fontWeight: 'bold',
        color: "#2FD175",
    },
    little_first: {},
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
        fontSize: Dimensions.get("window").height * 0.021,
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

        direction: 'ltr',
        borderRadius: 30,
        overflow: 'hidden',
        bottom: 0,
        height: '100%',
        width: '100%',
        marginTop: '-2%',
    },
    textButton: {
        fontSize: Dimensions.get("window").height * 0.019,
    }
});
