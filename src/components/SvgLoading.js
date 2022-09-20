import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import Svg, {Circle, Text, TSpan} from 'react-native-svg';
import LoadingDots from 'react-native-loading-dots';

const SvgLoading = props => {
  const width = 100;
  const height = 100;

  const size = width < height ? width - 32 : height - 5;
  const strokeWidth = 25;
  const radius = (size - strokeWidth) / 2;
  const circunference = radius * 2 * Math.PI;

  return (
    <Svg width={width} height={size}>
      <Circle
        stroke="rgb(240, 240, 240)"
        fill="#FFFFFF"
        cx={size / 2}
        cy={(size - 24) / 2}
        r={radius}
        strokeDasharray={`${circunference} ${circunference}`}
      />
      <ActivityIndicator
        style={{margin: '14%'}}
        size="large"
        color="rgb(180, 180, 180)"
      />
    </Svg>
  );
};

export default SvgLoading;
