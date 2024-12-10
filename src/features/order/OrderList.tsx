/* eslint-disable react-native/no-inline-styles */
import { View, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useCartStore } from '@state/cartStore'
import CustomText from '@components/ui/CustomText'
import { Colors, Fonts } from '@utils/Constants'
import OrderItem from './OrderItem'

const OrderList = () => {

    const cartItems = useCartStore((state) => state.cart);
    const totalItems = cartItems.reduce((acc, cart)=> acc + cart?.count, 0);
  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <View style={styles.imageContainer}>
            <Image source={require('@assets/icons/clock.png')} style={styles.image} />
        </View>
        <View>
            <CustomText variant="h5" fontFamily={Fonts.SemiBold}>Delivery in 10 minutes</CustomText>
            <CustomText variant="h8" style={{opacity: 0.5}} fontFamily={Fonts.SemiBold}>Shipment of {totalItems || 0} items</CustomText>
        </View>
        </View>
        {cartItems.map((cartItem) => {
            return (
                <OrderItem key={cartItem.id} item={cartItem} />
            )
        })}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 15,
        marginBottom: 15,
    },
    flexRow: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 12,
        gap: 12,
    },
    imageContainer: {
        backgroundColor: Colors.backgroundSecondary,
        padding: 10,
        borderRadius: 15,
    },
    image:{
        width: 30,
        height: 30,
    },
});

export default OrderList;