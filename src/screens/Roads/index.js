import * as React from 'react';
import { Alert, Button, StyleSheet,ScrollView, Image, Text, View} from 'react-native';
import pic from './ev.jpg'
import { TouchableHighlight } from 'react-native-gesture-handler';

const Roads = (props) => {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Eurovelo</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <ScrollView>
    
            <TouchableHighlight onPress={()=>Alert.alert("Test")}>
                <View style={styles.scrollElem}>
                <Image source={pic} style={styles.image}/>
                <View style={styles.evInfo}>
                <Text style={styles.evView}>EV1</Text>
                <Text style={styles.evView}>1000 km</Text> 
                </View>
                </View>
                </TouchableHighlight>
                <View style={styles.scrollElem}>
                <Image source={pic} style={styles.image}/>
                <View style={styles.evInfo}>
                <Text style={styles.evView}>EV1</Text>
                <Text style={styles.evView}>1000 km</Text> 
                </View>
                </View>
    
                <View style={styles.scrollElem}>
                <Image source={pic} style={styles.image}/>
                <View style={styles.evInfo}>
                <Text style={styles.evView}>EV1</Text>
                <Text style={styles.evView}>1000 km</Text> 
                </View>
                </View>
    
                <View style={styles.scrollElem}>
                <Image source={pic} style={styles.image}/>
                <View style={styles.evInfo}>
                <Text style={styles.evView}>EV1</Text>
                <Text style={styles.evView}>1000 km</Text> 
                </View>
                </View>
    
                <View style={styles.scrollElem}>
                <Image source={pic} style={styles.image}/>
                <View style={styles.evInfo}>
                <Text style={styles.evView}>EV1</Text>
                <Text style={styles.evView}>1000 km</Text> 
                </View>
                </View>
        </ScrollView>
        </View>)
}
    
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
        },

        title: {
          marginTop : 10,
          fontSize: 50,
          fontWeight: 'bold',
        },

        separator: {
          marginVertical: 10,
          height: 1,
          width: '80%',
        },
        scrollElem : {
          justifyContent : 'center'
      
        },

        image : {
          height : 200,
          width : 400,
          
        }, 

        evInfo :  {
          paddingTop:10,
          paddingBottom:10,
          flexDirection:'row',
          justifyContent : 'center',
          backgroundColor : '#d3d3d3',
        },

        evView : {
          fontSize : 30,
          justifyContent : 'space-around',
          paddingLeft : 50,
          paddingRight : 80,
        }
      });
  
  export default Roads;
  