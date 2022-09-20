import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
// import Calendar from '../Screens/CalendarScreen';
import Calendar from '../Screens/DisplayScreen';
import {useNavigation} from '@react-navigation/native';
import {getIoTData, fetchDateAverage, lastItem} from '../components/fetchData';

const NavigateCalendar = props => {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  // useEffect(() => {
  //   navigation.setOptions({headerShown: false});
  // }, []);

  let getIotData = [];
  let calendarObject = {};
  let firstItemObject = {};
  let lastItemObject = {};
  let lastDateOfMonth = '';

  if (props.availability) {
    getIotData = getIoTData('roomtemp', props.iotData);

    const iotDataCopy = [...getIotData];

    firstItemObject = iotDataCopy.shift();

    lastItemObject = iotDataCopy.pop();

    lastDateOfMonth = `${new Date(firstItemObject.date).getFullYear()}-${(
      '0' +
      (new Date(firstItemObject.date).getMonth() + 1)
    ).slice(-2)}-${new Date(
      new Date(firstItemObject.date).getFullYear(),
      new Date(firstItemObject.date).getMonth() + 1,
      0,
    ).getDate()}`;

    calendarObject = fetchDateAverage(getIotData);
  }

  return (
    <View>
      {!props.availability ? (
        <View style={{width: windowWidth, padding: 50}}>
          <Text style={styles.textfiled}>Please Connect to BITS Network</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.push('HomeScreen');
            }}>
            <Text>Reset Connection</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Calendar
          deviceId={props.deviceId}
          tempType={'roomtemp'}
          iotData={getIotData}
          calendarObject={calendarObject}
          firstItemObject={firstItemObject.date}
          lastItemObject={lastItemObject.date}
          lastDateOfMonth={lastDateOfMonth}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    fontSize: 18,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    marginTop: 20,
    padding: 10,
  },
  textfiled: {
    textAlign: 'center',
  },
});

export default NavigateCalendar;
