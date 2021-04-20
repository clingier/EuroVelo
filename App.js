import * as React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import Roads from './src/screens/RoadsScreen';
import OrganisationScreen from './src/screens/OrganisationScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {SvgXml} from 'react-native-svg';
import SVGMap from './src/assets/svg/map.svg';
import SVGRoads from './src/assets/svg/direction.svg';
import SVGOrganisation from './src/assets/svg/calendar.svg';


const Tab = createBottomTabNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trace_db: props.trace_db,
    };
  }

  render() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let name;
                    switch (route.name){
                        case 'Map':
                            iconName = focused ? 'src/assets/svg/map.svg' : 'src/assets/svg/map.svg';
                            name = "map"
                            break;
                            //return ( <SvgXml width="24" height="24" xml={SVGMap} />  )
                        case 'Roads':
                            iconName = focused ? 'src/assets/svg/direction.sgv' : 'src/assets/svg/direction.sgv';
                            name = "routes"
                            break;
                            //return ( <SvgXml width="24" height="24" xml={SVGRoads} />  )
                        case 'Organisation':
                            iconName = focused ? 'src/assets/svg/calendar.sgv' : 'src/assets/svg/calendar.sgv';
                            name = "calendar-check"
                            break;
                    }
                    // You can return any component that you like here!
                    return  <MaterialCommunityIcons name={name} color={color} size={size} />
                  },
                })}
                tabBarOptions={{
                  activeTintColor: '#2FD175',
                  inactiveTintColor: 'gray',
                }}

            >
                <Tab.Screen name="Map">{({navigation, route}) => 
                {
                  return <HomeScreen trace_db={this.state.trace_db} route={(route.params !== undefined) ? route.params.route : undefined}/>
                }}</Tab.Screen>
                <Tab.Screen name="Roads" component={Roads} />
                <Tab.Screen name="Organisation" component={OrganisationScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
  }
}
