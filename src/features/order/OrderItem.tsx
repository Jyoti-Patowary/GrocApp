/* eslint-disable react-native/no-inline-styles */
import { View, StyleSheet, Image } from 'react-native';
import React, { FC } from 'react';
import { Colors, Fonts } from '@utils/Constants';
import CustomText from '@components/ui/CustomText';
import UniversalAdd from '@components/ui/UniversalAdd';

const OrderItem: FC<{item: any}> = ({item}) => {
  return (
    <View style={styles.flexRow}>
        <View style={styles.imageContainer}>
            <Image style={styles.image} source={item?.item?.image} />
    </View>
    <View style={{width: '55%'}}>
        <CustomText numberOfLines={2} variant="h8" fontFamily={Fonts.Medium}>
            {item?.item?.name}
        </CustomText>
        <CustomText variant="h9" >
            {item?.item?.quantity}
        </CustomText>
    </View>

    <View style={{width: '20%', alignItems: 'flex-end'}}>
        <UniversalAdd item={item.item} />
        <CustomText variant="h8" fontFamily={Fonts.Medium} style={{marginTop: 4, alignSelf: 'flex-end'}}>
        ₹ {item?.count * item?.item?.price}
        </CustomText>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    image: {
        width: 40,
        height: 40,
    },
    imageContainer: {
        backgroundColor: Colors.backgroundSecondary,
        padding: 10,
        borderRadius: 15,
        width: '17%',
    },
    flexRow: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent:'space-between',
        paddingVertical: 12,
        borderTopWidth: 0.6,
        borderTopColor: Colors.border,
        gap: 12,
        paddingHorizontal: 10,
    },
});

export default OrderItem;
