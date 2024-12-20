import { View, SafeAreaView, StyleSheet, Pressable } from 'react-native';
import React, { FC } from 'react';
import { Colors, Fonts } from '@utils/Constants';
import Icon from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomText from './CustomText';
import { goBack } from '@utils/NavigationUtils';


const CustomHeader: FC<{ title: string; search?: boolean }> = ({ title, search }) => {
  return (
    <SafeAreaView>
      <View style={styles.flexRow}>
        <Pressable onPress={() => goBack()}>
          <Icon name="chevron-back" color={Colors.text} size={RFValue(16)} />
        </Pressable>
        <CustomText style={styles.text} variant="h5" fontFamily={Fonts.SemiBold}>
          {title}
        </CustomText>
        <View>
          {search && <Icon name="search" color={Colors.text} size={RFValue(16)} />}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 0.6,
    borderColor: Colors.border,
    marginTop: 35,
  },
  text: {
    textAlign: 'center',
  },
});

export default CustomHeader;
