import { View, StyleSheet } from 'react-native';
import React, { FC, useState } from 'react';
import CustomHeader from '@components/ui/CustomHeader';

const ProductCategories: FC = () => {

    const [selectedCategories, setSelectedCategories] = useState<any>(null);
    // const [categories, setCategories] = useState<any[]>([]);
    // const [products, setProducts] = useState<any[]>([]);
    // const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true);
    // const [productLoading, setproductLoading] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <CustomHeader title={selectedCategories?.name || 'Categories'} search/>
    </View>
  );
};

const styles = StyleSheet.create({
    container : {
        backgroundColor: 'black',
        flex: 1,
    },
    subContainer: {
       flex: 1,
       flexDirection: 'row',
       alignItems: 'center',
    },
    center: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
    },
});

export default ProductCategories;
