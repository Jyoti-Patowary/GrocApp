/* eslint-disable react-native/no-inline-styles */
import { View, StyleSheet, Pressable } from 'react-native';
import React, { FC } from 'react';
import { useCartStore } from '@state/cartStore';
import { Colors, Fonts } from '@utils/Constants';
import CustomText from './CustomText';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';

const UniversalAdd: FC<{ item: any }> = ({ item }) => {
  const count = useCartStore((state) => state.getItemCount(item.id));
  const { addItem, removeItem } = useCartStore();

  return (
    <View style={[styles.container, { backgroundColor: count === 0 ? '#fff' : Colors.secondary }]}>
      {count === 0 ? (
        <Pressable onPress={() => addItem(item)} style={styles.addItem}>
          <CustomText variant="h9" fontFamily={Fonts.SemiBold} style={styles.addText}>ADD</CustomText>
        </Pressable>
      ) : (
        <View style={styles.counterContainer}>
          <Pressable onPress={()=> removeItem(item.id)} style={styles.removeItemButton}>
            <Icon name="minus" color="#fff" size={RFValue(13)}/>
          </Pressable>
            <CustomText variant="h8" fontFamily={Fonts.SemiBold} style={styles.text}>{count}</CustomText>
            <Pressable onPress={()=> addItem(item)} style={styles.removeItemButton}>
            <Icon name="plus" color="#fff" size={RFValue(13)}/>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 65,
    borderColor: Colors.secondary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  addItem: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  text: {
    color: '#fff',
  },
  removeItemButton: {

  },
  addText: {
    color: Colors.secondary,
  },
});

export default UniversalAdd;
