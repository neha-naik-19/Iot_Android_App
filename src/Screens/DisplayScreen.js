import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  TouchableNativeFeedback,
  BackHandler,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
// import {StackActions} from '@react-navigation/native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {Text as SvgText} from 'react-native-svg';
import SvgScreen from '../components/SvgScreen';
import SvgLoading from '../components/SvgLoading';
import LoadingDots from 'react-native-loading-dots';
import {
  fetchDeviceIds,
  fetchApiData,
  fetchSingleDayData,
  getIoTData,
  fetchDateAverage,
} from '../components/fetchData';

const DisplayScreen = props => {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [loading, setLoading] = useState(false);
  const [svgLoading, setSvgLoading] = useState(false);
  const [noNetwork, setNoNetwork] = useState(false);

  const [deviceId, setDeviceId] = useState(
    props.route !== undefined ? props.route.params.deviceId : props.deviceId,
  );

  let [btnType, setBtnType] = useState(0);
  let [highLightBtn, setHighLightBtn] = useState(0);

  let [objDates, setObjDates] = useState(
    props.route !== undefined
      ? props.route.params.calendarObject
      : props.calendarObject,
  );

  const [firstDt, setFirstDt] = useState(
    props.route !== undefined
      ? props.route.params.firstItemObject
      : props.firstItemObject,
  );

  const [lastDt, setLastDt] = useState(
    props.route !== undefined
      ? props.route.params.lastItemObject
      : props.lastItemObject,
  );

  const [lastDateOfMonth, setLastDateOfMonth] = useState(
    props.route !== undefined
      ? props.route.params.lastDateOfMonth
      : props.lastDateOfMonth,
  );

  const [data, setData] = useState({});

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: '',
      // headerBackTitleVisible: true,
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#FFFF',
      },
      // headerStyle: {backgroundColor: '#778899'},
      headerStyle: {backgroundColor: '#15317E'}, //#15317E
      headerLeft: () => {
        return (
          <Image
            source={require('../assets/bits_logo.png')}
            style={{margin: 5}}></Image>
        );
      },
      headerRight: () => {
        return (
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                alignItems: 'center',
                marginRight: 15,
              }}>
              <Text
                style={{fontSize: 15, fontWeight: 'bold', color: '#FFFFFF'}}>
                Monthly Calendar
              </Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                // marginTop: 20,
              }}>
              <Icon
                name="bar-chart-outline"
                size={25}
                color={'white'}
                onPress={navigateBarChart}></Icon>
            </View>
          </View>
        );
      },
    });

    displayTempSvg(
      props.route !== undefined
        ? props.route.params.lastItemObject
        : props.lastItemObject,
      btnType,
    );
  }, []);

  const navigateDevicelist = async () => {
    try {
      setLoading(true);
      setNoNetwork(false);

      let deviceIds = await fetchDeviceIds();

      if (deviceIds !== undefined) {
        navigation.navigate('DeviceList', {
          deviceIds: deviceIds,
        });
      } else {
        setLoading(false);
        setNoNetwork(true);
      }
    } catch (error) {
      setLoading(false);
      setNoNetwork(true);
    }
  };

  const navigateBarChart = async () => {
    try {
      setLoading(true);
      setNoNetwork(false);

      const response = await fetchApiData('roomtemp', deviceId);

      if (response !== undefined) {
        navigation.navigate('BarChartScreen', {
          deviceId: deviceId,
          response: response,
        });
      } else {
        setLoading(false);
        setNoNetwork(true);
      }
    } catch (error) {
      setLoading(false);
      setNoNetwork(true);
    }
  };

  //On button click display different temp.
  const tempTypeDisplay = async type => {
    try {
      setLoading(true);
      setNoNetwork(false);

      btnType = type;
      setHighLightBtn(type);

      //Room Temp.
      if (type === 0) {
        const response = await fetchApiData('roomtemp', deviceId);
        const getIotData = getIoTData('roomtemp', response);

        const iotDataCopy = [...getIotData];

        const firstItemObject = iotDataCopy.shift();

        const lastItemObject = iotDataCopy.pop();

        const lastDateOfMonth = `${new Date(
          firstItemObject.date,
        ).getFullYear()}-${(
          '0' +
          (new Date(firstItemObject.date).getMonth() + 1)
        ).slice(-2)}-${new Date(
          new Date(firstItemObject.date).getFullYear(),
          new Date(firstItemObject.date).getMonth() + 1,
          0,
        ).getDate()}`;

        const calendarObject = fetchDateAverage(getIotData);

        setFirstDt(firstItemObject.date);

        setLastDateOfMonth(lastDateOfMonth);

        setObjDates(calendarObject);

        displayTempSvg(lastItemObject.date, btnType);

        //Humidity
      } else if (type === 1) {
        const response = await fetchApiData('humidity', deviceId);
        const getIotData = getIoTData('humidity', response);

        const iotDataCopy = [...getIotData];

        const firstItemObject = iotDataCopy.shift();

        const lastItemObject = iotDataCopy.pop();

        const lastDateOfMonth = `${new Date(
          firstItemObject.date,
        ).getFullYear()}-${(
          '0' +
          (new Date(firstItemObject.date).getMonth() + 1)
        ).slice(-2)}-${new Date(
          new Date(firstItemObject.date).getFullYear(),
          new Date(firstItemObject.date).getMonth() + 1,
          0,
        ).getDate()}`;

        const calendarObject = fetchDateAverage(getIotData);

        setFirstDt(firstItemObject.date);

        setLastDateOfMonth(lastDateOfMonth);

        setObjDates(calendarObject);

        displayTempSvg(lastItemObject.date, btnType);
      } else if (type === 2) {
        const response = await fetchApiData('unitconsumption', deviceId);
        const getIotData = getIoTData('unitconsumption', response);

        const iotDataCopy = [...getIotData];

        const firstItemObject = iotDataCopy.shift();

        const lastItemObject = iotDataCopy.pop();

        const lastDateOfMonth = `${new Date(
          firstItemObject.date,
        ).getFullYear()}-${(
          '0' +
          (new Date(firstItemObject.date).getMonth() + 1)
        ).slice(-2)}-${new Date(
          new Date(firstItemObject.date).getFullYear(),
          new Date(firstItemObject.date).getMonth() + 1,
          0,
        ).getDate()}`;

        const calendarObject = fetchDateAverage(getIotData);

        setFirstDt(firstItemObject.date);

        setLastDateOfMonth(lastDateOfMonth);

        setObjDates(calendarObject);

        displayTempSvg(lastItemObject.date, btnType);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setNoNetwork(true);
    }
  };

  //Display temp. in svg
  const displayTempSvg = async (day, type) => {
    try {
      setSvgLoading(true);
      setNoNetwork(false);
      let response = [];
      let itemData = {};

      if (type === 0) {
        response = await fetchSingleDayData('roomtemp', deviceId, day);

        if (response.length > 0) {
          if (response[0].temp <= 18) {
            itemData = {dt: day, color: '#FFA07A', avg: response[0].temp};
          } else if (response[0].temp <= 26) {
            itemData = {dt: day, color: '#FA8072', avg: response[0].temp};
          } else if (response[0].temp > 26) {
            itemData = {dt: day, color: '#FF0000', avg: response[0].temp};
          } else if (avg[0].temp === null) {
            itemData = {dt: day, color: '#A8A8A8', avg: response[0].temp};
          }
        }
      } else if (type === 1) {
        response = await fetchSingleDayData('humidity', deviceId, day);

        if (response.length > 0) {
          if (response[0].temp <= 70) {
            itemData = {dt: day, color: '#87CEEB', avg: response[0].temp};
          } else if (response[0].temp > 70) {
            itemData = {dt: day, color: '#718EFF', avg: response[0].temp};
          } else if (avg[0].temp === null) {
            itemData = {dt: day, color: '#A8A8A8', avg: response[0].temp};
          }
        }
      } else if (type === 2) {
        response = await fetchSingleDayData('unitconsumption', deviceId, day);

        if (response.length > 0) {
          if (response[0].temp === null) {
            itemData = {
              dt: day,
              color: '#A8A8A8',
              avg: response[0].temp === null ? 'N/A' : response[0].temp,
            };
          } else {
            itemData = {dt: day, color: '#718EFF', avg: response[0].temp};
          }
        }
      }

      if (response.length > 0) {
        setData(itemData);
      } else {
        setData({dt: day, color: '#606060', avg: 'N/A'});
      }
      setSvgLoading(false);
    } catch (error) {
      setSvgLoading(false);
      setNoNetwork(true);
    }
  };

  const refreshScreen = async () => {
    try {
      setLoading(true);
      setNoNetwork(false);
      setHighLightBtn(0);

      const response = await fetchApiData('roomtemp', deviceId);
      const getIotData = getIoTData('roomtemp', response);

      const iotDataCopy = [...getIotData];

      const firstItemObject = iotDataCopy.shift();

      const lastItemObject = iotDataCopy.pop();

      const lastDateOfMonth = `${new Date(
        firstItemObject.date,
      ).getFullYear()}-${(
        '0' +
        (new Date(firstItemObject.date).getMonth() + 1)
      ).slice(-2)}-${new Date(
        new Date(firstItemObject.date).getFullYear(),
        new Date(firstItemObject.date).getMonth() + 1,
        0,
      ).getDate()}`;

      const calendarObject = fetchDateAverage(getIotData);

      setFirstDt(firstItemObject.date);

      setLastDateOfMonth(lastDateOfMonth);

      setObjDates(calendarObject);

      displayTempSvg(lastItemObject.date, btnType);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setNoNetwork(true);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: 'column',
          width: windowWidth,
        },
      ]}>
      <View style={{flex: 0.5}}>
        <View
          style={{
            borderWidth: 1,
            flex: 1,
            justifyContent: 'center',
            backgroundColor: '#DCDCDC',
            borderColor: '#DCDCDC',
            borderRadius: 5,
            marginTop: 5,
            flexDirection: 'row',
          }}>
          <View style={{flex: 1}}>
            <TouchableOpacity
              style={{padding: 10}}
              onPress={navigateDevicelist}>
              <Text style={{fontSize: 22, fontWeight: 'bold'}}>{deviceId}</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end', padding: '4%'}}>
            <Icon
              name="refresh-circle-outline"
              size={30}
              color={'rgb(90, 90, 90)'}
              onPress={refreshScreen}></Icon>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            marginTop: '2.5%',
            borderRadius: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {/* <TouchableNativeFeedback
            onPress={getTempType}
            background={TouchableNativeFeedback.Ripple('rgba(0,0,0,.2)', true)}>
            <View style={[styles.touchable, {paddingTop: 10, height: 50}]}>
              <Text style={styles.text}>{tempType}</Text>
            </View>
          </TouchableNativeFeedback> */}
          <View
            style={
              highLightBtn === 0
                ? [styles.selected, {marginRight: '1%'}]
                : [styles.tempButton, {marginRight: '1%'}]
            }>
            <TouchableOpacity
              style={{padding: 10}}
              onPress={() => tempTypeDisplay(0)}>
              <Text
                style={
                  highLightBtn === 0 ? styles.selectedLabel : styles.buttonLabel
                }>
                Room Temp.
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={
              highLightBtn === 1
                ? [styles.selected, {marginRight: '1%'}]
                : [styles.tempButton, {marginRight: '1%'}]
            }>
            <TouchableOpacity
              style={{padding: 10}}
              onPress={() => tempTypeDisplay(1)}>
              <Text
                style={
                  highLightBtn === 1 ? styles.selectedLabel : styles.buttonLabel
                }>
                Humidity
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={
              highLightBtn === 2
                ? [styles.selected, {marginRight: '1%'}]
                : [styles.tempButton, {marginRight: '1%'}]
            }>
            <TouchableOpacity
              style={{padding: 10}}
              onPress={() => tempTypeDisplay(2)}>
              <Text
                style={
                  highLightBtn === 2 ? styles.selectedLabel : styles.buttonLabel
                }>
                Unit Consumption
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {!noNetwork ? (
        <View style={{flex: 2.2}}>
          {!loading ? (
            <ScrollView
              style={{
                flex: 1,
                marginTop: '4%',
                marginBottom: '2%',
                borderRadius: 5,
              }}
              contentContainerStyle={{
                paddingBottom: '12%',
              }}
              showsVerticalScrollIndicator={false}>
              <View style={styles.box}>
                <View
                  style={{
                    flexDirection: 'row',
                    height: '15%',
                    paddingTop: '3%',
                    paddingBottom: '3%',
                    paddingLeft: '20%',
                    paddingRight: '20%',
                    backgroundColor: '#F0F8FF',
                    borderRadius: 4,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      backgroundColor:
                        highLightBtn === 0
                          ? '#FFA07A'
                          : highLightBtn === 1
                          ? '#87CEEB'
                          : '#A8A8A8',
                      borderRadius: 20,
                      marginRight: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {highLightBtn === 0 ? (
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: '#FFFFFF',
                        }}>{`< 18`}</Text>
                    ) : highLightBtn === 1 ? (
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: '#FFFFFF',
                        }}>{`<= 70`}</Text>
                    ) : (
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: '#FFFFFF',
                        }}>
                        ...
                      </Text>
                    )}
                  </View>
                  <View
                    style={{
                      flex: 1,
                      // backgroundColor: '#FA8072',
                      backgroundColor:
                        highLightBtn === 0
                          ? '#FA8072'
                          : highLightBtn === 1
                          ? '#718EFF'
                          : '#A8A8A8',
                      borderRadius: 20,
                      marginRight: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {highLightBtn === 0 ? (
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: '#FFFFFF',
                        }}>{`<= 26`}</Text>
                    ) : highLightBtn === 1 ? (
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: '#FFFFFF',
                        }}>{`> 70`}</Text>
                    ) : (
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: '#FFFFFF',
                        }}>
                        ...
                      </Text>
                    )}
                  </View>
                  <View
                    style={{
                      flex: 1,
                      // backgroundColor: '#FF0000',
                      backgroundColor:
                        highLightBtn === 0
                          ? '#FF0000'
                          : highLightBtn === 1
                          ? '#A8A8A8'
                          : '#A8A8A8',
                      borderRadius: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {highLightBtn === 0 ? (
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: '#FFFFFF',
                        }}>{`> 26`}</Text>
                    ) : highLightBtn === 1 ? (
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: '#FFFFFF',
                        }}>
                        ...
                      </Text>
                    ) : (
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: '#FFFFFF',
                        }}>
                        ...
                      </Text>
                    )}
                  </View>
                </View>
                <View
                  style={{
                    borderBottomColor: '#808080',
                    borderBottomWidth: 1,
                    marginTop: 1,
                    marginBottom: 1,
                  }}
                />
                <Calendar
                  style={[{borderRadius: 4}]}
                  // initialDate={firstItem(iotData)}
                  initialDate={firstDt}
                  // maxDate={`${new Date(firstItem(iotData)).getFullYear()}-${(
                  //   '0' +
                  //   (new Date(iotData[iotData.length - 1].date).getMonth() + 1)
                  // ).slice(-2)}-${new Date(
                  //   new Date(firstItem(iotData)).getFullYear(),
                  //   new Date(firstItem(iotData)).getMonth() + 1,
                  //   0,
                  // ).getDate()}`}
                  maxDate={lastDateOfMonth}
                  onDayPress={day => {
                    displayTempSvg(day.dateString, highLightBtn);
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
              <View style={styles.svgView}>
                {!svgLoading ? <SvgScreen dayItem={data} /> : <SvgLoading />}
              </View>
            </ScrollView>
          ) : (
            <View style={styles.loadingScreen}>
              <View style={styles.dotsWrapper}>
                <LoadingDots
                  size={12}
                  colors={['#98AFC7', '#98AFC7', '#98AFC7', '#98AFC7']}
                />
              </View>
            </View>
          )}
        </View>
      ) : (
        <View
          style={{
            flex: 2.1,
            borderWidth: 1,
            borderColor: '#808080',
            marginTop: '4%',
            marginBottom: '2%',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {!loading ? (
            <Text>Please Connect to BITS Network</Text>
          ) : (
            <LoadingDots
              size={12}
              colors={['#98AFC7', '#98AFC7', '#98AFC7', '#98AFC7']}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: '3%',
    paddingLeft: '3%',
    backgroundColor: '#FFFFFF',
  },
  touchable: {flex: 1},
  box: {
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#808080',
    padding: '2.5%',
    backgroundColor: '#FFFFFF',
  },
  tempButton: {
    flex: 1,
    borderRadius: 5,
    borderWidth: 0.5,
    backgroundColor: '#FDF5E6',
    borderColor: '#DFD7C8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    flex: 1,
    borderRadius: 5,
    borderWidth: 0,
    backgroundColor: '#d4b091',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#d4b091',
    textAlign: 'center',
  },
  selectedLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  label: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 24,
  },
  svgView: {
    height: 120,
    marginTop: '1.5%',
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#808080',
    backgroundColor: '#F0F8FF',
  },
  loadingScreen: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#808080',
    margin: 10,
    borderRadius: 7,
  },
  dotsWrapper: {
    width: 100,
  },
});

export default DisplayScreen;
