import { View, StyleSheet, Image } from 'react-native';
import React, { FC } from 'react';
import ScalePress from '@components/ui/ScalePress';
import { navigate } from '@utils/NavigationUtils';
import CustomText from '@components/ui/CustomText';
import { Fonts } from '@utils/Constants';

const CategoryContainer: FC<{ data: any[] }> = ({ data }) => {

    const renderItems = (items: any) => {
        return (
            <>
                {items.map((item: any, index: any) => {
                    return (
                        <ScalePress onPress={() => navigate('ProductCategories')} key={index} style={styles.item}>
                            <View style={styles.categoryItem}>
                                <Image source={item.image} style={styles.img} />
                            </View>
                            <CustomText variant="h8" style={styles.text} fontFamily={Fonts.Medium}>
                                {item.name}
                            </CustomText>
                        </ScalePress>
                    );
                })}
            </>
        );
    }

  return (
    <View style={styles.container}>
      <View style={styles.row}>{renderItems(data?.slice(0, 4))}</View>
      <View style={styles.row}>{renderItems(data?.slice(4, 8))}</View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 25,
    },
    item: {
        width: '22%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryItem: {
        width: '100%',
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#e5F3F3',
        shadowColor: '#000',
        padding: 6,
        marginBottom: 8,
    },
    img: {
        width: 80,
        height: '100%',
        resizeMode: 'contain',
    },
    text: {
        alignItems: 'center',
    },
});

export default CategoryContainer;
