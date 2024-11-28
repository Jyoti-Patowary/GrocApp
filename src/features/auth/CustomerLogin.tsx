/* eslint-disable react-hooks/exhaustive-deps */
import CustomeSafeAreaView from '@components/global/CustomSafeAreaView';
import ProductSlider from '@components/login/ProductSlider';
import CustomButton from '@components/ui/CustomButton';
import CustomInput from '@components/ui/CustomInput';
import CustomText from '@components/ui/CustomText';
import { Colors, Fonts, lightColors } from '@utils/Constants';
import { resetAndNavigate } from '@utils/NavigationUtils';
import useKeyboardOffsetHeight from '@utils/useKeyboardUp';
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Keyboard, Alert } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import { customerLogin } from '@service/authService';

const bottomColors = [...lightColors].reverse();

const CustomerLogin = () => {
  const [gestureSequence, setGestureSequence] = useState<string[]>([]);
  const [phonenumber, setPhonenumber] = useState('');
  const [loading, setLoading] = useState(false);
  const keyboardOffsetHeight = useKeyboardOffsetHeight();
  const animatedValue = useRef(new Animated.Value(0)).current;

  const handleAuth = async () => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      await customerLogin(phonenumber);
      resetAndNavigate('ProductDashboard');
    } catch (error) {
      Alert.alert('Login Error', 'Unable to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGesture = ({ nativeEvent }: { nativeEvent: any }) => {
    if (nativeEvent.state === State.END) {
      const { translationX, translationY } = nativeEvent;
      let direction = '';
      if (Math.abs(translationX) > Math.abs(translationY)) {
        direction = translationX > 0 ? 'right' : 'left';
      } else {
        direction = translationY > 0 ? 'down' : 'up';
      }

      const newSequence = [...gestureSequence, direction].slice(-5);
      setGestureSequence(newSequence);

      if (newSequence.join(' ') === 'up up down left right') {
        setGestureSequence([]);
        resetAndNavigate('DeliveryLogin');
      }
    }
  };

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: keyboardOffsetHeight === 0 ? 0 : -keyboardOffsetHeight * 0.84,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [keyboardOffsetHeight]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <CustomeSafeAreaView>
          <ProductSlider />
          <PanGestureHandler onHandlerStateChange={handleGesture}>
            <Animated.ScrollView
              contentContainerStyle={styles.subContainer}
              style={{ transform: [{ translateY: animatedValue }] }}
            >
              <LinearGradient colors={bottomColors} style={styles.gradient} />
              <View style={styles.content}>
                <CustomText variant="h1" fontFamily={Fonts.Bold}>
                  GROCCER
                </CustomText>
                <CustomText variant="h9" fontFamily={Fonts.Bold}>
                  Your own local shop now at your fingertips
                </CustomText>
                <CustomText variant="h5" fontFamily={Fonts.Bold} style={styles.text}>
                  Login or Signup
                </CustomText>
                <CustomInput
                  onChangeText={(text) => setPhonenumber(text.slice(0, 10))}
                  onClear={() => setPhonenumber('')}
                  value={phonenumber}
                  left={<CustomText
                    style={styles.phoneNumber}
                    variant="h6"
                    fontFamily={Fonts.SemiBold}
                  >
                    + 91
                  </CustomText>}
                  placeholder="Enter phone number"
                  inputMode="numeric" right={false}                />
                <CustomButton
                  disabled={phonenumber.length !== 10}
                  onPress={handleAuth}
                  loading={loading}
                  title="Continue"
                />

            <CustomText style={styles.footer} variant="h6" fontSize={RFValue(7)}>
              By continuing, you agree to our Terms and Conditions
            </CustomText>

              </View>
            </Animated.ScrollView>
          </PanGestureHandler>
        </CustomeSafeAreaView>


      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
    paddingBottom: 20,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  text: {
    marginBottom: 20,
    opacity: 0.6,
    marginTop: 20,
  },
  phoneNumber: {
    marginLeft: 10,
  },
  footer: {
    borderTopColor: Colors.border,
    // borderTopWidth: 0.8,
    paddingBottom: 10,
    zIndex: 22,
    position: 'absolute',
    bottom: 0,
    padding: 10,
    // backgroundColor: '#f8f9fc',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  gradient: {
    paddingTop: 60,
    width: '100%',
  },
});

export default CustomerLogin;
