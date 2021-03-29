import * as React from 'react';
// import getRoad from './ev3';
import HomeScreen from './src/screens/HomeScreen';
import RoadsScreen from './src/screens/RoadsScreen';
import Description from './src/screens/Description';

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

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Map" component={HomeScreen} />
                <Tab.Screen name="Roads" component={Roads} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
