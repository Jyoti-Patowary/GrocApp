/* eslint-disable react-native/no-inline-styles */
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { FC, useEffect, useRef } from 'react';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import CustomText from '@components/ui/CustomText';
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from '@utils/Constants';

interface SidebarProps {
  selectedCategory: any;
  categories: any[];
  onCategoryPress: (category: any) => void;
}

const Sidebar: FC<SidebarProps> = ({
  selectedCategory,
  categories,
  onCategoryPress,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const indicatorPosition = useSharedValue(0);
  const animatedValues = useRef(categories.map(() => useSharedValue(0))).current;


  useEffect(() => {
    let targetIndex = -1;

    categories.forEach((category: any, index: number) => {
      const isSelected = selectedCategory?.id === category?.id;
      animatedValues[index].value = withTiming(isSelected ? 2 : -15, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      });
      if (isSelected) {
        targetIndex = index;
      }
    });
    if (targetIndex !== -1) {
      indicatorPosition.value = withTiming(targetIndex * 100, {
        duration: 500,
        easing: Easing.inOut(Easing.ease),
      });


      runOnJS(() => {
        scrollViewRef.current?.scrollTo({
          y: Math.max(targetIndex * 100 - 50, 0),
          animated: true,
        });
      });
    }
  }, [selectedCategory, categories, animatedValues, indicatorPosition]);


  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: indicatorPosition.value }],
    backgroundColor: Colors.secondary,
    borderRadius: 15,
  }));


  return (
    <View style={styles.sidebar}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
        snapToAlignment="start"
  snapToInterval={100}
        >
        <Animated.View style={[styles.indicator, indicatorStyle]} />
        <Animated.View>
          {categories.map((category: any, index: number) => {
            const animatedStyles = useAnimatedStyle(() => ({
              bottom: animatedValues[index].value,
              easing: Easing.inOut(Easing.ease),
            }));

            return (
              <TouchableOpacity
                key={category.id}
                activeOpacity={0.7}
                style={styles.categoryButton}
                onPress={() => onCategoryPress(category)}>
                <View
                  style={[
                    styles.imageContainer,
                    selectedCategory?.id === category.id && styles.selectedImageContainer,
                  ]}>
                  <Animated.Image
                    source={
                      typeof category.image === 'number'
                        ? category.image
                        : { uri: category.image }
                    }
                    style={[styles.image, animatedStyles]}
                  />
                </View>
                <CustomText fontSize={RFValue(7)} style={{ textAlign: 'center' }}>
                  {category?.name || 'Unknown'}
                </CustomText>
              </TouchableOpacity>
            );
          })}
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    width: '24%',
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
    paddingTop: 10,
    position: 'relative',
  },
  categoryButton: {
    paddingHorizontal: 5,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  imageContainer: {
    borderRadius: 50,
    height: 60,
    marginBottom: 10,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
  selectedImageContainer: {
    backgroundColor: '#d4f8e8',
    borderWidth: 2,
    borderColor: '#4caf50',
  },
  indicator: {
    position: 'absolute',
    right: 0,
    height: 80,
    width: 5,
    top: 10,
    backgroundColor: Colors.secondary,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
});

export default Sidebar;
