/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { FC } from 'react';
import { View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import CustomText from '@components/ui/CustomText';
import { Fonts } from '@utils/Constants';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@state/authStore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Header: FC<{ showNotice: () => void }> = ({ showNotice }) => {
  const { setUser, user } = useAuthStore();

  return (
      <View style={styles.subContainer}>
        <TouchableOpacity activeOpacity={0.8}>
          <CustomText fontFamily={Fonts.Bold} style={styles.text} variant="h8">
            Delivery in
          </CustomText>
          <View style={styles.flexRowGap}>
            <CustomText fontFamily={Fonts.SemiBold} style={styles.text} variant="h2">
              10 minutes
            </CustomText>
            <TouchableOpacity style={styles.noticeButton} onPress={showNotice}>
              <CustomText
                fontFamily={Fonts.Bold}
                style={styles.noticeText}
                variant="h8"
                fontSize={RFValue(5)}
              >
                🌧️ Rain
              </CustomText>
            </TouchableOpacity>
          </View>

          <View style={styles.flexRow}>
            <CustomText
              fontFamily={Fonts.Medium}
              style={styles.textSecond}
              numberOfLines={1}
              variant="h9"
            >
              {user?.address || 'H.No. 22, Pub-Oghuli, Narengi, 781171'}
            </CustomText>
            <Icon name="menu-down" color="#fff" size={RFValue(20)} style={styles.icon} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
        //  style={styles.accountIcon}
         >
          <Icon name="account-circle-outline" color="#fff" size={RFValue(36)} />
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: Platform.OS === 'android' ? 10 : 5,
    justifyContent: 'space-between',
  },
  text: {
    color: '#fff',
  },
  flexRowGap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  noticeButton: {
    backgroundColor: '#E8EAF5',
    paddingHorizontal: 8,
    borderRadius: 100,
    paddingVertical: 2,
    bottom: -2,
  },
  noticeText: {
    color: '#3B4889',
  },
  flexRow: {
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 2,
    width: '70%',
  },
  textSecond: {
    color: '#fff',
    width: '90%',
    textAlign: 'left',
    paddingHorizontal: 5,
  },
  icon: {
    bottom: -1,
  },
  // accountIcon: {
  //   position: 'absolute',
  //   right: 10,
  //   top: Platform.OS === 'android' ? 10 : 5,
  //   zIndex: 10,
  // },
});

export default Header;
