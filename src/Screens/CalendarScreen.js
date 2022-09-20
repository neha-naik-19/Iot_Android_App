import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
// import {StackActions} from '@react-navigation/native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {Text as SvgText} from 'react-native-svg';
import SvgScreen from '../components/SvgScreen';
import {
  fetchApiData,
  fetchDateAverage,
  firstItem,
  lastItem,
  getIoTData,
  currentDate,
} from '../components/fetchData';

const CalendarScreen = props => {
  const navigation = useNavigation();
  const [flexDirection, setflexDirection] = useState('column');
  const [val, setVal] = useState('column');
  const [data, setData] = useState({});
  let [objDates, setObjDates] = useState({});
  const [loading, setLoading] = useState(true);
  const [deviceId, setDeviceId] = useState(props.deviceId);
  let [iotData, setIotData] = useState([]);
  var monthDays = new Array();
  var iotDays = new Array();
  let itemData = {...data};
  // let iotData = [];
  let values = ['column', 'row', 'row-reverse'];

  iotData = getIoTData(props.iotData, 'column');

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: '',
      headerBackTitleVisible: true,
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#FFFF',
      },
      headerStyle: {backgroundColor: '#778899'},
      headerLeft: () => {
        return (
          <Image
            source={require('../assets/bits_logo.png')}
            style={{margin: 5}}></Image>
        );
      },
      headerRight: () => {
        return (
          <View>
            <Text style={{fontSize: 15, fontWeight: 'bold', color: '#FFFFFF'}}>
              Monthly Calendar
            </Text>
          </View>
        );
      },
    });

    // iotData = [];
    // iotData = getIoTData(props.iotData, 'column');
    setObjDates(fetchDateAverage(iotData));

    displayTemp(currentDate(iotData), flexDirection);
    setLoading(false);
  }, []);

  // console.log('props 2 : ', props.iotData);

  const displayCalendarData = async val => {
    let data = [];
    iotData = [];
    let items = '';

    setLoading(true);
    if (val === 'column') {
      data = await fetchApiData(
        `http://apps.csis.bits-goa.ac.in/api/roomtemp/${deviceId}`,
      );

      items = getIoTData(data, 'column');
    } else if (val === 'row') {
      data = await fetchApiData(
        `http://apps.csis.bits-goa.ac.in/api/humidity/${deviceId}`,
      );

      items = getIoTData(data, 'row');
    } else if (val === 'row-reverse') {
      data = await fetchApiData(
        `http://apps.csis.bits-goa.ac.in/api/unitconsumption/${deviceId}`,
      );

      items = getIoTData(data, 'row-reverse');
    }

    iotData = items;
    setObjDates(fetchDateAverage(iotData));
    displayTemp(currentDate(iotData), flexDirection);
    setLoading(false);
  };

  const displayTemp = (day, flexDirection) => {
    // iotData = [];
    // iotData = getIoTData(props.iotData, flexDirection);

    console.log(iotData);

    if (iotData[0].roomTemp !== '') {
      let avg = iotData
        .filter(item => item.date == day)
        .map(({roomTemp}) => ({roomTemp}));

      if (avg.length > 0) {
        if (avg[0].roomTemp <= 18) {
          itemData = {dt: day, color: '#FFA07A', avg: avg[0].roomTemp};
        } else if (avg[0].roomTemp <= 26) {
          itemData = {dt: day, color: '#FA8072', avg: avg[0].roomTemp};
        } else if (avg[0].roomTemp > 26) {
          itemData = {dt: day, color: '#FF0000', avg: avg[0].roomTemp};
        }
      }
    } else if (iotData[0].humidity !== '') {
      let avg = iotData
        .filter(item => item.date == day)
        .map(({humidity}) => ({humidity}));

      itemData = {dt: day, color: '#718EFF', avg: avg[0].humidity};
    } else if (iotData[0].unitconsumption !== '') {
      let avg = iotData
        .filter(item => item.date == day)
        .map(({unitconsumption}) => ({unitconsumption}));

      itemData = {dt: day, color: '#718EFF', avg: avg[0].unitconsumption};
    }

    setData(itemData);
  };

  // objDates = fetchDateAverage(iotData);

  const buttonLabel = val => {
    // if (val === 'column') {
    //   return 'Room Temp.';
    // } else if (val === 'row') {
    //   return 'Unit Consumption';
    // } else if (val === 'row-reverse') {
    //   return 'Humidity';
    // } else if (val === 'column-reverse') {
    //   return 'External Temp.';
    // }
  };

  return (
    <View style={styles.mainContainer}>
      <PreviewLayout
        label="flexDirection"
        values={values}
        touchableLabel={buttonLabel(values)}
        selectedValue={flexDirection}
        setSelectedValue={setflexDirection}
        deviceId={deviceId}
        displayCalendarData={displayCalendarData}>
        {loading ? (
          <View
            style={[
              styles.box,
              {alignItems: 'center', justifyContent: 'center'},
            ]}>
            <ActivityIndicator size="large" color="#808080" />
          </View>
        ) : (
          <ScrollView style={[StyleSheet.absoluteFill, styles.scrollView]}>
            <View style={styles.box}>
              <View
                style={{
                  flexDirection: 'row',
                  height: '15%',
                  paddingTop: 10,
                  paddingBottom: 10,
                  paddingLeft: 70,
                  paddingRight: 70,
                  backgroundColor: 'aliceblue',
                }}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#FFA07A',
                    borderRadius: 20,
                    marginRight: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#FFFFFF',
                    }}>{`< 18`}</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#FA8072',
                    borderRadius: 20,
                    marginRight: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#FFFFFF',
                    }}>{`<= 26`}</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#FF0000',
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#FFFFFF',
                    }}>{`> 26`}</Text>
                </View>
              </View>
              <View
                style={{
                  borderBottomColor: 'grey',
                  borderBottomWidth: 1,
                }}
              />
              <Calendar
                style={[{height: '70%'}]}
                initialDate={firstItem(iotData)}
                maxDate={`${new Date(firstItem(iotData)).getFullYear()}-${(
                  '0' +
                  (new Date(iotData[iotData.length - 1].date).getMonth() + 1)
                ).slice(-2)}-${new Date(
                  new Date(firstItem(iotData)).getFullYear(),
                  new Date(firstItem(iotData)).getMonth() + 1,
                  0,
                ).getDate()}`}
                onDayPress={day => {
                  displayTemp(day.dateString, flexDirection);
                }}
                hideArrows={true}
                hideExtraDays={true}
                scrollEnabled={true}
                markingType={'custom'}
                markedDates={objDates}
                theme={{
                  'stylesheet.day.basic': {
                    disabledText: {color: '#404040'},
                  },
                  'stylesheet.calendar.header': {
                    dayTextAtIndex0: {
                      color: '#191970',
                      textTransform: 'uppercase',
                      fontWeight: 'bold',
                      marginBottom: 10,
                    },
                    dayTextAtIndex1: {
                      color: '#191970',
                      textTransform: 'uppercase',
                      fontWeight: 'bold',
                      marginBottom: 10,
                    },
                    dayTextAtIndex2: {
                      color: '#191970',
                      textTransform: 'uppercase',
                      fontWeight: 'bold',
                      marginBottom: 10,
                    },
                    dayTextAtIndex3: {
                      color: '#191970',
                      textTransform: 'uppercase',
                      fontWeight: 'bold',
                      marginBottom: 10,
                    },
                    dayTextAtIndex4: {
                      color: '#191970',
                      textTransform: 'uppercase',
                      fontWeight: 'bold',
                      marginBottom: 10,
                    },
                    dayTextAtIndex5: {
                      color: '#191970',
                      textTransform: 'uppercase',
                      fontWeight: 'bold',
                      marginBottom: 10,
                    },
                    dayTextAtIndex6: {
                      color: '#191970',
                      textTransform: 'uppercase',
                      fontWeight: 'bold',
                      marginBottom: 10,
                    },
                    monthText: {
                      color: '#191970',
                      marginBottom: 25,
                      textTransform: 'uppercase',
                      fontWeight: 'bold',
                    },
                  },
                }}
              />
            </View>

            <View
              style={{
                height: 100,
                marginTop: 10,
                borderRadius: 7,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{position: 'absolute'}}>
                <SvgScreen itemData={data} />
              </View>
            </View>
          </ScrollView>
        )}
      </PreviewLayout>
    </View>
  );
};

const PreviewLayout = ({
  label,
  children,
  values,
  touchableLabel,
  selectedValue,
  setSelectedValue,
  deviceId,
  displayCalendarData,
}) => (
  <View style={{padding: 10, flex: 1}}>
    <View style={styles.deviceView}>
      <Text style={{fontSize: 22, fontWeight: 'bold'}}>{deviceId}</Text>
    </View>
    <View style={styles.row}>
      {values.map(value => (
        <TouchableOpacity
          key={value}
          onPress={() => {
            setSelectedValue(value);
            displayCalendarData(value);
          }}
          style={[styles.button, selectedValue === value && styles.selected]}>
          <Text
            style={[
              styles.buttonLabel,
              selectedValue === value && styles.selectedLabel,
            ]}>
            {value === 'column'
              ? 'Room Temp.'
              : value === 'row-reverse'
              ? 'Unit Consumption'
              : value === 'row'
              ? 'Humidity'
              : 'External Temp.'}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
    <View
      style={[
        styles.container,
        // , {[label]: selectedValue}
      ]}>
      {children}
    </View>
  </View>
);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'column',
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 2,
    marginTop: 8,
  },
  box: {
    height: '80%',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#808080',
    padding: 10,
  },
  loadingBox: {
    flex: 1,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#808080',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 4,
    backgroundColor: 'oldlace',
    alignSelf: 'flex-start',
    marginHorizontal: '1%',
    marginBottom: 10,
    minWidth: '48%',
    textAlign: 'center',
  },
  selected: {
    backgroundColor: 'coral',
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: 'coral',
  },
  selectedLabel: {
    color: 'white',
  },
  label: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 24,
  },
  deviceView: {
    height: '10%',
    marginBottom: 10,
    backgroundColor: '#DCDCDC',
    justifyContent: 'center',
    paddingLeft: 20,
  },
});

export default CalendarScreen;
