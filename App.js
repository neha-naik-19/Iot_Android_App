import * as React from 'react';
import {View, Text, Button, BackHandler} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/Screens/HomeScreen';
import DisplayScreen from './src/Screens/DisplayScreen';
import BarChartScreen from './src/Screens/BarChartScreen';
import DeviceList from './src/Screens/DeviceList';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="DisplayScreen"
          component={DisplayScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="DeviceList"
          component={DeviceList}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="BarChartScreen"
          component={BarChartScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
