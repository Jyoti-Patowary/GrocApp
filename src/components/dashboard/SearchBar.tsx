import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import Icon  from 'react-native-vector-icons/Ionicons';
import { Colors, Fonts } from '@utils/Constants';
import { RFValue } from 'react-native-responsive-fontsize';
import RollingBar from 'react-native-rolling-bar';
import CustomText from '@components/ui/CustomText';

const SearchBar: FC = () => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <Icon name="search" color={Colors.text} size={RFValue(20)}/>
      <RollingBar interval={400} customStyle={styles.textContainer} defaultStyle={false} >
        <CustomText variant="h8" fontFamily={Fonts.Medium}>Search "Purabi Dairy"</CustomText>
        <CustomText variant="h8" fontFamily={Fonts.Medium}>Search "Atta, Dal"</CustomText>
        <CustomText variant="h8" fontFamily={Fonts.Medium}>Search "Rice"</CustomText>
        <CustomText variant="h8" fontFamily={Fonts.Medium}>Search "Meat, Fish"</CustomText>
        <CustomText variant="h8" fontFamily={Fonts.Medium}>Search "Softdrinks"</CustomText>
        <CustomText variant="h8" fontFamily={Fonts.Medium}>Search "Sweets"</CustomText>
        </RollingBar>
    <View style={styles.divider}/>
    <Icon name="mic" color={Colors.text} size={RFValue(20)} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F3F4F7',
        borderTopWidth: 1,
        borderWidth: 0.6,
        borderColor: Colors.border,
        borderRadius: 10,
        marginTop: 15,
        overflow: 'hidden',
        marginHorizontal: 10,
        paddingHorizontal: 10,
    },
    textContainer: {
        width: '90%',
        height: 50,
        paddingLeft: 10,
    },
    divider:{
        width: 1,
        height: 24,
        backgroundColor: '#ddd',
        marginHorizontal: 10,
    },
});

export default SearchBar;
