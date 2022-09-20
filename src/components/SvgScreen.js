import React, {useEffect, useState} from 'react';
import Svg, {Circle, Text, TSpan} from 'react-native-svg';

const SvgScreen = props => {
  const width = 100;
  const height = 100;

  const size = width < height ? width - 32 : height - 5;
  const strokeWidth = 25;
  const radius = (size - strokeWidth) / 2;
  const circunference = radius * 2 * Math.PI;

  return (
    <Svg width={width} height={size}>
      <Circle
        stroke={props.dayItem.color}
        fill={props.dayItem.color}
        cx={size / 2}
        cy={(size - 24) / 2}
        r={radius}
        strokeDasharray={`${circunference} ${circunference}`}
      />
      <Text
        stroke="#FFFFFF"
        fill="#FFFFFF"
        fontSize="16"
        x={size / 2}
        y={(size - 24) / 2}
        textAnchor="middle">
        <TSpan x={size / 2}>{new Date(props.dayItem.dt).getDate()}</TSpan>
        <TSpan x={size / 2} dy="20">
          {props.dayItem.avg}
        </TSpan>
      </Text>
    </Svg>
  );
};

export default SvgScreen;
