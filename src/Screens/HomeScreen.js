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
} from 'react-native';
import LoadingDots from 'react-native-loading-dots';
import NavigateCalendar from '../components/NavigateCalendar';
// import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {fetchApiData, getIoTData} from '../components/fetchData';

const HomeScreen = navigation => {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [availability, setAvailability] = useState(true);
  const [iotData, setIotData] = useState([]);
  const deviceId = 'D250AC01';

  let response = [];

  // const source = axios.CancelToken.source();

  const fetchData = async () => {
    setLoading(true);
    try {
      response = await fetchApiData('roomtemp', deviceId);

      if (response === undefined) {
        setAvailability(false);
      } else {
        setIotData(response);
        setAvailability(true);
      }

      setLoading(false);
    } catch (error) {
      console.log('Error : ', error.message);
      setAvailability(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={[styles.container]}>
      {loading ? (
        // <View>
        //   <ActivityIndicator size="large" color="#0000ff" />
        //   <Text style={styles.textfiled}>Please wait..</Text>
        // </View>
        <View style={styles.loadingScreen}>
          <View style={styles.dotsWrapper}>
            <LoadingDots
              // dots={5} default 4
              size={15} // default 20
              colors={['#FFDB58', '#FFDF00', '#F9DB24', '#FFD801']}
            />
          </View>
        </View>
      ) : (
        <NavigateCalendar
          availability={availability}
          deviceId={deviceId}
          iotData={iotData}
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
  },
  textfiled: {
    textAlign: 'center',
  },
  loadingScreen: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotsWrapper: {
    width: 100,
  },
});

export default HomeScreen;
