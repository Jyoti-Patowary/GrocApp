import { View, ViewStyle, SafeAreaView, StyleSheet } from 'react-native';
import React, { FC } from 'react';

interface CustomSafeAreaViewProps {
  children: React.ReactNode;
  style ?: ViewStyle
}
const CustomeSafeAreaView : FC<CustomSafeAreaViewProps> = ({children, style}) => {
  return (
    <SafeAreaView style={[styles.container, style]}>
      <View style={[styles.container, style]}>{children}</View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default CustomeSafeAreaView;