/* eslint-disable react-native/no-inline-styles */
import React, { FC, useRef } from 'react';
import { ViewStyle, TouchableOpacity, Animated } from 'react-native';

interface ScalePressProps {
  onPress: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
}

const ScalePress: FC<ScalePressProps> = ({ onPress, children, style }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}
      activeOpacity={1}
      style={style}
    >
      <Animated.View style={[{ transform: [{ scale: scaleValue }] }]}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default ScalePress;
