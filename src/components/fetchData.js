import React, {useEffect, useState} from 'react';
import axios from 'axios';

// let test = [
//   '2022-05-01',
//   '2022-05-02',
//   '2022-05-03',
//   '2022-05-04',
//   '2022-05-06',
//   '2022-05-07',
//   '2022-05-08',
//   '2022-05-09',
//   '2022-05-11',
//   '2022-05-12',
//   '2022-05-13',
// ];

const fetchDeviceIds = async () => {
  try {
    const configurationObject = {
      method: 'GET',
      url: `http://apps.csis.bits-goa.ac.in/api/deviceIds`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    const response = await axios(configurationObject);

    return response.data;
  } catch (error) {
    console.log('Error : ', error.message);
  }
};

const fetchApiData = async (tempType, deviceId) => {
  const url = `http://apps.csis.bits-goa.ac.in/api/${tempType}/${deviceId}`;
  try {
    const configurationObject = {
      method: 'GET',
      url: url,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    const response = await axios(configurationObject);

    return response.data;
  } catch (error) {
    console.log('Error : ', error.message);
  }
};

const fetchSingleDayData = async (temp, deviceId, dt) => {
  const url = `http://apps.csis.bits-goa.ac.in/api/${temp}/${deviceId}/${dt}`;

  try {
    const configurationObject = {
      method: 'GET',
      url: url,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    const response = await axios(configurationObject);

    return response.data;
  } catch (error) {
    console.log('Error : ', error.message);
  }
};

const backColor = (day, iotData) => {
  let color = '';

  if (iotData[0].roomTemp !== '') {
    let avg = iotData
      .filter(item => item.date == day)
      .map(({roomTemp}) => ({roomTemp}));

    if (avg[0].roomTemp <= 18) {
      color = '#FFA07A';
    } else if (avg[0].roomTemp <= 26) {
      color = '#FA8072';
    } else if (avg[0].roomTemp > 26) {
      color = '#FF0000';
    } else if (avg[0].roomTemp === null) {
      color = '#A8A8A8';
    }
  } else if (iotData[0].humidity !== '') {
    let avg = iotData
      .filter(item => item.date == day)
      .map(({humidity}) => ({humidity}));

    if (avg[0].humidity <= 70) {
      color = '#87CEEB';
    } else if (avg[0].humidity > 70) {
      color = '#718EFF';
    } else if (avg[0].humidity === null) {
      color = '#A8A8A8';
    }
  } else if (iotData[0].unitconsumption !== '') {
    let avg = iotData
      .filter(item => item.date == day)
      .map(({unitconsumption}) => ({unitconsumption}));

    if (avg[0].unitconsumption === null) {
      color = '#A8A8A8';
    } else {
      color = '#718EFF';
    }
  }

  return color;
};

const containerWidth = (day, iotData) => {
  let avg = iotData
    .filter(item => item.date == day)
    .map(({roomTemp}) => ({roomTemp}));

  if (avg[0].roomTemp <= 18) {
    return '25%';
  } else if (avg[0].roomTemp <= 26) {
    return '50%';
  } else if (avg[0].roomTemp > 26) {
    return '70%';
  }
};

const currentDate = iotData => {
  return `${new Date(iotData[iotData.length - 1].date).getFullYear()}-${(
    '0' +
    (new Date(iotData[iotData.length - 1].date).getMonth() + 1)
  ).slice(-2)}-${new Date(iotData[iotData.length - 1].date).getDate()}`;
};

const getIoTData = (type, iotData) => {
  if (type === 'roomtemp') {
    return iotData.map((i, index) => {
      return {
        date: i._id,
        roomTemp: i.roomTemp,
        humidity: '',
        unitconsumption: '',
      };
    });
  } else if (type === 'humidity') {
    return iotData.map((i, index) => {
      return {
        date: i._id,
        roomTemp: '',
        humidity: i.humidity,
        unitconsumption: '',
      };
    });
  } else if (type === 'unitconsumption') {
    return iotData.map((i, index) => {
      return {
        date: i._id,
        roomTemp: '',
        humidity: '',
        unitconsumption: i.unitconsumption,
      };
    });
  }
};

const firstItem = iotData => {
  let fItem = iotData.shift();
  return fItem.date;
};

const lastItem = iotData => {
  return iotData.pop();
};

const fetchDateAverage = iotData => {
  var monthDays = new Array();
  var iotDays = new Array();
  let markedDates = {};
  let unMarkedDates = {};

  let iotDataCopy = [...iotData];

  let firstItem = iotDataCopy.shift();
  let lastItem = iotDataCopy.pop();

  let markedDatesArray = iotData.map(a => a.date);

  for (
    var i = 0;
    i <=
    new Date(
      new Date(firstItem.date).getFullYear(),
      new Date(firstItem.date).getMonth() + 1,
      0,
    ).getDate();
    i++
  ) {
    if (i > 0) {
      monthDays.push(i);
    }
  }

  for (var i = 0; i <= markedDatesArray.length; i++) {
    if (!isNaN(new Date(markedDatesArray[i]).getDate())) {
      iotDays.push(new Date(markedDatesArray[i]).getDate());
    }
  }

  let dtWoAvg = monthDays.filter(f => !iotDays.includes(f));

  let iotWoAvgDate = dtWoAvg.map((i, index) => {
    return {
      date: `${new Date(firstItem.date).getFullYear()}-${(
        '0' +
        (new Date(firstItem.date).getMonth() + 1)
      ).slice(-2)}-${('0' + i.toString()).slice(-2)}`,
    };
  });

  let unMarkedDatesArray = iotWoAvgDate.map(a => a.date);

  markedDatesArray.forEach(day => {
    // markedDates[day] = {selected: true};
    markedDates[day] = {
      customStyles: {
        container: {
          backgroundColor: backColor(day, iotData),
          elevation: 4,
          // borderRadius: 0,
          // width: containerWidth(day),
          // height: '20%',
        },
        text: {
          color: 'black',
          fontWeight: 'bold',
          // fontSize: 10,
        },
      },
    };
  });

  unMarkedDatesArray.forEach(day => {
    unMarkedDates[day] = {
      disabled: true,
      // disableTouchEvent: true,
    };
  });

  var objDates = Object.assign({}, markedDates, unMarkedDates);

  return objDates;
};

const displayTempSvg = async (day, tempType, deviceId) => {
  let response = [];
  let itemData = {};

  if (tempType === 0) {
    response = await fetchSingleDayData('roomtemp', deviceId, day);

    if (response.length > 0) {
      if (response[0].temp <= 18) {
        itemData = {dt: day, color: '#FFA07A', avg: response[0].temp};
      } else if (response[0].temp <= 26) {
        itemData = {dt: day, color: '#FA8072', avg: response[0].temp};
      } else if (response[0].temp > 26) {
        itemData = {dt: day, color: '#FF0000', avg: response[0].temp};
      }
    }
  } else if (tempType === 1) {
    response = await fetchSingleDayData('humidity', deviceId, day);

    if (response.length > 0) {
      if (response[0].temp <= 70) {
        itemData = {dt: day, color: '#FFA07A', avg: response[0].temp};
      } else {
        itemData = {dt: day, color: '#FA8072', avg: response[0].temp};
      }
    }
  } else if (tempType === 2) {
    response = await fetchSingleDayData('unitconsumption', deviceId, day);
  }

  if (response.length > 0) {
    return itemData;
  } else {
    return {dt: day, color: '#606060', avg: 'N/A'};
  }
};

export {
  getIoTData,
  fetchApiData,
  currentDate,
  firstItem,
  lastItem,
  fetchDateAverage,
  fetchDeviceIds,
  fetchSingleDayData,
  displayTempSvg,
};
// export {firstItem};
// export {lastItem};
// export {fetchDateAverage};
