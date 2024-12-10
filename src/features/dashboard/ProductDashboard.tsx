/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {View, Animated as RNAnimated, StyleSheet, SafeAreaView, TouchableOpacity, Platform} from 'react-native';
import React, {useEffect, useRef} from 'react';
import NoticeAnimation from './NoticeAnimation';
import {NoticeHeight, screenHeight} from '@utils/Scaling';
import Visuals from './Visuals';
import {
  CollapsibleContainer,
  CollapsibleHeaderContainer,
  CollapsibleScrollView,
  useCollapsibleContext,
  withCollapsibleContext,
} from '@r0b0t3d/react-native-collapsible';
import AnimatedHeader from './AnimatedHeader';
import SearchBar from '@components/dashboard/SearchBar';
import Content from '@components/dashboard/Content';
import CustomText from '@components/ui/CustomText';
import {RFValue} from 'react-native-responsive-fontsize';
import {Fonts} from '@utils/Constants';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import  Icon  from 'react-native-vector-icons/Ionicons';
import WithCart from '@features/cart/WithCart';

const NOTICE_HEIGHT = -(NoticeHeight + 12);
const ProductDashboard = () => {
  const {scrollY, expand} = useCollapsibleContext();
const previousScroll = useRef<number>(0);

const backToTop = useAnimatedStyle(() => {
  const isScrollUp = scrollY.value < previousScroll.current && scrollY.value > 180;
  const opacity = withTiming(isScrollUp ? 1 : 0, {duration: 300});
  const translateY = withTiming(isScrollUp ? 0 : 10, {duration: 300});

  previousScroll.current = scrollY.value;

  return {
    opacity,
    transform: [{ translateY }],
  };
});


  const noticePosition = useRef(new RNAnimated.Value(NOTICE_HEIGHT)).current;

  const slideUp = () => {
    RNAnimated.timing(noticePosition, {
      toValue: NOTICE_HEIGHT,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };

  const slideDown = () => {
    RNAnimated.timing(noticePosition, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    slideDown();
    const timeOut = setTimeout(() => {
      slideUp();
    }, 3500);
    return () => clearTimeout(timeOut);
  }, []);

  return (
    <NoticeAnimation noticePosition={noticePosition}>
      <>
        <Visuals />
        <SafeAreaView />
        <Animated.View style={[styles.backToTopButton, backToTop]}>
          <TouchableOpacity
          onPress={()=>{
            scrollY.value = 0;
            expand();
          }}
          style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
            <Icon name="arrow-up-circle-outline" color="white" size={RFValue(12)}/>
            <CustomText variant="h9" style={{color: 'white'}} fontFamily={Fonts.SemiBold}>Back to top</CustomText>
          </TouchableOpacity>
        </Animated.View>
        <View style={styles.container}>
          <CollapsibleContainer style={styles.panelContainer}>
            <CollapsibleHeaderContainer containerStyle={styles.transparent}>
              <AnimatedHeader
                showNotice={() => {
                  slideDown();
                  const timeOut = setTimeout(() => {
                    slideUp();
                  }, 3500);
                  return () => clearTimeout(timeOut);
                }}
              />
              <SearchBar />
            </CollapsibleHeaderContainer>
            <CollapsibleScrollView
              nestedScrollEnabled
              style={styles.panelContainer}
              showsVerticalScrollIndicator={false}>
              <Content />

              <View style={{backgroundColor: 'F8F8F8', padding: 20}}>
                <CustomText
                  fontSize={RFValue(32)}
                  fontFamily={Fonts.Bold}
                  style={{opacity: 0.2}}>
                  Your Local Grocer App
                </CustomText>
                <CustomText
                  fontFamily={Fonts.Bold}
                  style={{opacity: 0.2, paddingBottom: 100, marginTop: 10}}>
                   Shopping, delivery, and more. 🛍️
                </CustomText>
              </View>
            </CollapsibleScrollView>
          </CollapsibleContainer>
        </View>
      </>
    </NoticeAnimation>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  panelContainer: {
    flex: 1,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  backToTopButton:{
    position: 'absolute',
    alignSelf: 'center',
    top: Platform.OS === 'ios' ? screenHeight * 0.18 : 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'black',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
    zIndex: 999,
  },
});

export default WithCart(withCollapsibleContext(ProductDashboard));
