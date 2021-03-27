import React from 'react';
import {Platform, Alert, Button, StyleSheet, ScrollView, Image, Text, View} from 'react-native';
import pic from '../../assets/images/ev.jpg';
import {useState, Component, ImageBackground} from "react-native-web";


function Description(props) {
    return (
        <View style={[styles.container, {
            // Try setting `flexDirection` to `"row"`.
            //flexDirection: "column"
        }]}>
            <Image style={{width: '100%', height: '35%'}} source={pic}/>
            <ScrollView>

                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
                <View style={{flex: 1, backgroundColor: "white"}}>
                    <Text style={styles.routeText}>
                        {"Route 1"}
                    </Text>
                    <Text style={styles.titleText}>
                        {"Atlantic Coast Route"}
                    </Text>

                    <Text style={styles.description}>
                        {"Vita est illis semper in fuga uxoresque mercenariae conductae ad tempus ex pacto atque, ut sit species matrimonii, dotis nomine futura coniunx hastam et tabernaculum offert marito, post statum diem si id elegerit discessura, et incredibile est quo ardore apud eos in venerem uterque solvitur sexus.\n" +
                        "\n" +
                        "Adolescebat autem obstinatum propositum erga haec et similia multa scrutanda, stimulos admovente regina, quae abrupte mariti fortunas trudebat in exitium praeceps, cum eum potius lenitate feminea ad veritatis humanitatisque viam reducere utilia suadendo deberet, ut in Gordianorum actibus factitasse Maximini truculenti illius imperatoris rettulimus coniugem.\n" +
                        "\n" +
                        "Hacque adfabilitate confisus cum eadem postridie feceris, ut incognitus haerebis et repentinus, hortatore illo hesterno clientes numerando, qui sis vel unde venias diutius ambigente agnitus vero tandem et adscitus in amicitiam si te salutandi adsiduitati dederis triennio indiscretus et per tot dierum defueris tempus, reverteris ad paria perferenda, nec ubi esses interrogatus et quo tandem miser discesseris, aetatem omnem frustra in stipite conteres summittendo."}
                    </Text>
                </View>
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
