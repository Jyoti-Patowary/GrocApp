/* eslint-disable react-native/no-inline-styles */
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import React, { FC } from 'react';
import CustomHeader from '@components/ui/CustomHeader';
import { Colors, Fonts } from '@utils/Constants';
import OrderList from './OrderList';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomText from '@components/ui/CustomText';
import { useCartStore } from '@state/cartStore';
import BillDetails from './BillDetails';

const ProductOrder: FC = () => {

    const  {getTotalPrice, cart, clearCart} = useCartStore()
    const totalItemPrice = getTotalPrice()
  return (
    <View style={styles.container}>
      <CustomHeader title="Checkout" />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <OrderList />

        <View style={styles.flexRowBetween}>
          <View style={styles.flexRow}>
            <Image source={require('@assets/icons/coupon.png')} style={{width: 25, height: 25}} />
            <CustomText variant="h6" fontFamily={Fonts.SemiBold}>Use Coupons</CustomText>
          </View>
          <Icon name="chevron-right" size={RFValue(16)} color={Colors.text}/>
        </View>
        <BillDetails totalItemPrice={totalItemPrice} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        padding: 10,
        backgroundColor: Colors.backgroundSecondary,
        paddingBottom: 250,
    },
    flexRowBetween: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderRadius: 15,
    },
    flexRow: {
        alignItems: 'center',
        padding: 10,
        flexDirection:'row',
        gap: 10,
    },
});

export default ProductOrder;
