import * as React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import RoadsScreen from './src/screens/RoadsScreen';
import Description from './src/screens/Description';
import OrganisationScreen from './src/screens/OrganisationScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from "@react-navigation/stack";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Roads() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Roads" component={RoadsScreen} />
            <Stack.Screen name="Description" component={Description} />
        </Stack.Navigator>
    );
}

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
            <Tab.Navigator>
                <Tab.Screen name="Map">{() => <HomeScreen trace_db={this.state.trace_db} />}</Tab.Screen>
                <Tab.Screen name="Roads" component={Roads} />
                <Tab.Screen name="Organisation" component={OrganisationScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
  }
}
