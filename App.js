import * as React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import Roads from './src/screens/RoadsScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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
            <Tab.Navigator>
                <Tab.Screen name="Map">{() => <HomeScreen trace_db={this.state.trace_db} />}</Tab.Screen>
                <Tab.Screen name="Roads" component={Roads} />
            </Tab.Navigator>
        </NavigationContainer>
    );
  }
}
