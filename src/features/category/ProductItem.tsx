/* eslint-disable react-native/no-inline-styles */
import {View, StyleSheet, Image} from 'react-native';
import React, {FC} from 'react';
import {screenHeight} from '@utils/Scaling';
import {Colors, Fonts} from '@utils/Constants';
import CustomText from '@components/ui/CustomText';
import {RFValue} from 'react-native-responsive-fontsize';
import UniversalAdd from '@components/ui/UniversalAdd';

const ProductItem: FC<{item: any; index: number}> = ({item, index}) => {
  const isSecondColumn = index % 2 !== 0;
  return (
    <View style={[styles.container, {marginRight: isSecondColumn ? 10 : 0}]}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.flexrow}>
          <Image
            source={require('@assets/icons/clock.png')}
            style={styles.clock}
          />
          <CustomText fontSize={RFValue(6)} fontFamily={Fonts.Medium}>
            8 MINS
          </CustomText>
        </View>
        <CustomText
          variant="h8"
          numberOfLines={2}
          style={{marginVertical: 4}}
          fontFamily={Fonts.Medium}>
          {item.name}
        </CustomText>
        <View style={styles.priceContainer}>
          <View>
            <CustomText variant="h8" fontFamily={Fonts.Medium}>
              ₹ {item.price}
            </CustomText>
            <CustomText
              variant="h8"
              fontFamily={Fonts.Medium}
              style={{opacity: 0.8, textDecorationLine: 'line-through'}}>
              ₹ {item.discountPrice}
            </CustomText>
          </View>
          <UniversalAdd item={item} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    marginLeft: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    height: screenHeight * 0.14,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  image: {
    height: '100%',
    width: '100%',
    aspectRatio: 1 / 1,
    resizeMode: 'contain',
  },
  detailsContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  flexrow: {
    flexDirection: 'row',
    padding: 2,
    borderRadius: 4,
    alignItems: 'center',
    gap: 2,
    backgroundColor: Colors.backgroundSecondary,
    alignSelf: 'flex-start',
  },
  clock: {
    width: 15,
    height: 15,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'auto',
    paddingVertical: 10,
  },
});

export default ProductItem;
