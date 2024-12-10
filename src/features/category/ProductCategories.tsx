import {View, StyleSheet, ActivityIndicator} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import CustomHeader from '@components/ui/CustomHeader';
import {getAllCategories, getProductById} from '@service/ProductService';
import {Colors} from '@utils/Constants';
import Sidebar from './Sidebar';
import ProductList from './ProductList';
import WithCart from '@features/cart/WithCart';

const ProductCategories: FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true);
  const [productLoading, setProductLoading] = useState<boolean>(false);

  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true);
      const data = await getAllCategories();
      setCategories(data);
      if (data && data.length > 0) {
        setSelectedCategories(data[0]);
      }
    } catch (error) {
      console.log('Error fetching categories', error);
    } finally {
      setCategoriesLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchProducts = async (categoryId: string) => {
    try {
      setProductLoading(true);
      const data = await getProductById(categoryId);
      setProducts(data || []);
    } catch (error) {
      console.log('Error fetching Products', error);
    } finally {
      setProductLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCategories?.id) {
      fetchProducts(selectedCategories?.id);
    }
  }, [selectedCategories]);

  const handleCategoryPress = (category: any) => {
    setSelectedCategories(category);
  };

  return (
    <View style={styles.container}>
      <CustomHeader title={selectedCategories?.name || 'Categories'} search />
      <View style={styles.subContainer}>
        {categoriesLoading ? (
          <View style={styles.center}>
            <ActivityIndicator size="small" color={Colors.border} />
          </View>
        ) : (
          <Sidebar
            categories={categories}
            selectedCategory={selectedCategories}
            onCategoryPress={handleCategoryPress}
          />
        )}
        {productLoading ? (
          <ActivityIndicator
            size="large"
            color={Colors.border}
            style={styles.center}
          />
        ) : (
          <ProductList data={products || []} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WithCart(ProductCategories);
