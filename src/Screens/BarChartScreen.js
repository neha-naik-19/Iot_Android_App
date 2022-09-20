import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
  ActivityIndicator,
  BackHandler,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import LoadingDots from 'react-native-loading-dots';
import {
  fetchApiData,
  getIoTData,
  fetchDateAverage,
  lastItem,
} from '../components/fetchData';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

const BarChartSCreen = props => {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  let [btnType, setBtnType] = useState(0);
  let [highLightBtn, setHighLightBtn] = useState(0);
  const [loading, setLoading] = useState(false);
  const [noNetwork, setNoNetwork] = useState(false);

  const data = [
    [
      [0, 1],
      [1, 3],
      [3, 7],
      [4, 9],
    ],
  ];

  const navigateCalendar = async () => {
    try {
      setLoading(true);
      setNoNetwork(false);

      let response = await fetchApiData(
        'roomtemp',
        props.route.params.deviceId,
      );

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

      navigation.navigate('DisplayScreen', {
        deviceId: props.route.params.deviceId,
        iotData: response,
        calendarObject: calendarObject,
        firstItemObject: firstItemObject.date,
        lastItemObject: lastItemObject.date,
        lastDateOfMonth: lastDateOfMonth,
      });

      // setLoading(false);
    } catch (error) {
      setLoading(false);
      setNoNetwork(true);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: '',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#FFFF',
      },
      headerStyle: {backgroundColor: '#15317E'},
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
                Bar Chart
              </Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                // marginTop: 20,
              }}>
              <Icon
                name="calendar-outline"
                size={25}
                color={'white'}
                onPress={navigateCalendar}></Icon>
            </View>
          </View>
        );
      },
    });
  }, []);

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
            // backgroundColor: '#DCDCDC',
            borderColor: '#DCDCDC',
            borderRadius: 5,
            marginTop: 5,
          }}>
          <TouchableOpacity style={{padding: 10}}>
            <Text style={{fontSize: 22, fontWeight: 'bold'}}>
              {props.route.params.deviceId}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            marginTop: '2.5%',
            borderRadius: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={
              highLightBtn === 0
                ? [styles.selected, {marginRight: '1%'}]
                : [styles.tempButton, {marginRight: '1%'}]
            }>
            <TouchableOpacity
              style={{padding: 10}}
              // onPress={() => tempTypeDisplay(0)}
            >
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
              // onPress={() => tempTypeDisplay(1)}
            >
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
              // onPress={() => tempTypeDisplay(2)}
            >
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
        <View
          style={{
            flex: 2.2,
            marginTop: 15,
            marginBottom: 5,
            borderWidth: 0.5,
            alignItems: 'center',
            paddingTop: 10,
            borderRadius: 5,
          }}>
          {/* {!loading ? ( */}
          <LineChart
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June'],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ],
                },
              ],
            }}
            width={Dimensions.get('window').width} // from react-native
            height={520}
            // yAxisLabel="$"
            // yAxisSuffix="k"
            // yAxisInterval={1} // optional, defaults to 1
            // chartConfig={{
            //   backgroundColor: '#e26a00',
            //   backgroundGradientFrom: 'black',
            //   backgroundGradientTo: '#ffa726',
            //   decimalPlaces: 2, // optional, defaults to 2dp
            //   color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            //   labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            //   style: {
            //     borderRadius: 16,
            //   },
            //   propsForDots: {
            //     r: '6',
            //     strokeWidth: '2',
            //     stroke: '#ffa726',
            //   },
            // }}
            chartConfig={{
              backgroundGradientFrom: '#FFFFFF',
              backgroundGradientFromOpacity: 0,
              backgroundGradientTo: '#FFFFFF',
              backgroundGradientToOpacity: 0.5,
              color: (opacity = 1) => `rgba(90, 90, 90, ${opacity})`,
              strokeWidth: 1, // optional, default 3
              barPercentage: 0.5,
              useShadowColorFromDataset: false, // optional
              withHorizontalLines: false,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
          {/* ) : (
            <View style={styles.loadingScreen}>
              <View style={styles.dotsWrapper}>
                <LoadingDots
                  size={12}
                  colors={['#98AFC7', '#98AFC7', '#98AFC7', '#98AFC7']}
                />
              </View>
            </View>
          )} */}
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
    padding: 8,
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
    // borderWidth: 0.5,
    // borderColor: '#808080',
    margin: 10,
    borderRadius: 7,
  },
  dotsWrapper: {
    width: 100,
  },
});

export default BarChartSCreen;
