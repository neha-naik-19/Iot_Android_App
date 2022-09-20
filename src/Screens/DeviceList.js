import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  fetchApiData,
  getIoTData,
  fetchDateAverage,
  lastItem,
} from '../components/fetchData';
import LoadingDots from 'react-native-loading-dots';

const DeviceList = props => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: '',
      headerBackTitleVisible: true,
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
    });
  }, []);

  const navigateBack = async selectedDeviceId => {
    setLoading(true);
    let response = await fetchApiData('roomtemp', selectedDeviceId);

    const getIotData = getIoTData('roomtemp', response);

    const iotDataCopy = [...getIotData];

    const firstItemObject = iotDataCopy.shift();

    const lastItemObject = iotDataCopy.pop();

    const lastDateOfMonth = `${new Date(firstItemObject.date).getFullYear()}-${(
      '0' +
      (new Date(firstItemObject.date).getMonth() + 1)
    ).slice(-2)}-${new Date(
      new Date(firstItemObject.date).getFullYear(),
      new Date(firstItemObject.date).getMonth() + 1,
      0,
    ).getDate()}`;

    const calendarObject = fetchDateAverage(getIotData);

    navigation.navigate('DisplayScreen', {
      deviceId: selectedDeviceId,
      iotData: response,
      calendarObject: calendarObject,
      firstItemObject: firstItemObject.date,
      lastItemObject: lastItemObject.date,
      lastDateOfMonth: lastDateOfMonth,
    });
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={loading ? styles.loadingView : styles.loadedView}>
        <View style={styles.dotsWrapper}>
          <LoadingDots
            size={8}
            colors={['#708090', '#778899', '#BCC6CC', '#DCDCDC']}
          />
        </View>
      </View>
      <FlatList
        contentContainerStyle={{paddingBottom: 20}}
        data={props.route.params.deviceIds}
        keyExtractor={(item, index) => item}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <View style={styles.insideView}>
              <Text style={styles.headerText}>Device</Text>
            </View>
          </View>
        )}
        stickyHeaderIndices={[0]}
        extraData={props.route.params.deviceIds}
        renderItem={({item, index}) => {
          return (
            <View style={styles.item}>
              <View style={styles.insideView}>
                <TouchableOpacity
                  onPress={() => {
                    navigateBack(item);
                  }}>
                  <Text style={styles.text}>{item}</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '4%',
    paddingLeft: '1%',
    paddingRight: '1%',
    paddingBottom: '2%',
  },
  headingText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#191970',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#8D918D',
    padding: 8,
    MarginBottom: 0,
    marginHorizontal: 16,
    borderRadius: 3,
  },
  headerText: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  insideView: {
    flex: 1,
    alignItems: 'flex-start',
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
    padding: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#808080',
    borderRadius: 8,
  },
  text: {
    fontSize: 15,
    color: 'black',
  },
  dotsWrapper: {
    width: 100,
  },
  loadingView: {
    margin: 10,
    alignItems: 'center',
  },
  loadedView: {
    display: 'none',
  },
});

export default DeviceList;
