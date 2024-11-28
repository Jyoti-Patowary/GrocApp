import { View, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import AdCarousel from './AdCarousel';
import { adData, categories } from '@utils/dummyData';
import CustomText from '@components/ui/CustomText';
import { Fonts } from '@utils/Constants';
import CategoryContainer from './CategoryContainer';


const Content: FC = () => {
  return (
    <View style={styles.container}>
      <AdCarousel adData={adData}/>
      <CustomText variant="h6" fontFamily={Fonts.SemiBold}>Grocery & Kitchen</CustomText>
      <CategoryContainer data={categories} />
      <CustomText variant="h6" fontFamily={Fonts.SemiBold}>Household Essentials </CustomText>
      <CategoryContainer data={categories} />
      <CustomText variant="h6" fontFamily={Fonts.SemiBold}>Utensils </CustomText>
      <CategoryContainer data={categories} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,

    },
    text: {

    },
});

export default Content;
