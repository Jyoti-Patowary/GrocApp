import React, { FC, useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { screenHeight, screenWidth } from '@utils/Scaling';

const AdCarousel: FC<{ adData: any[] }> = ({ adData }) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const scaleValue = useRef(new Animated.Value(1)).current;
  const currentIndexRef = useRef(0);

  const onPressIn = () => {
    Animated.spring(scaleValue, { toValue: 0.9, useNativeDriver: true }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleValue, { toValue: 1, useNativeDriver: true }).start();
  };

  const handleNext = useCallback(() => {
    if (scrollViewRef.current) {
      const nextIndex = (currentIndexRef.current + 1) % adData.length;
      currentIndexRef.current = nextIndex;
      scrollViewRef.current.scrollTo({
        x: (screenWidth * 0.9 + 10) * nextIndex,
        animated: true,
      });
    }
  }, [adData.length]);

  useEffect(() => {
    const interval = setInterval(handleNext, 3000);
    return () => clearInterval(interval);
  }, [handleNext]);

  const onScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / (screenWidth * 0.9 + 10));
    currentIndexRef.current = index;
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {adData.map((item, index) => (
          <View style={styles.imageContainer} key={index}>
            <TouchableOpacity
              onPressIn={onPressIn}
              onPressOut={onPressOut}
              activeOpacity={1}
              style={styles.imageWrapper}
            >
              <Animated.Image
                source={item}
                style={[styles.img, { transform: [{ scale: scaleValue }] }]}
              />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    marginBottom: 0,
  },
  imageContainer: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    marginRight: 10,
  },
  imageWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
    width: '100%',
    height: '100%',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 20,
  },
});

export default AdCarousel;
