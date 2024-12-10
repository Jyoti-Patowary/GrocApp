// import axios from 'axios';
// import { BASE_URL } from './config';

import { categories } from '@utils/dummyData';

// export const getAllCategories = async () => {
//     try {
//         const response = await axios.get(`${BASE_URL}/categories`);
//         return response.data;
//     } catch (error) {
//         console.log('Error getting categories', error);
//         return [];
//     }
// };

// export const getCategoryProducts = async (id: any) => {
//     try {
//         const response = await axios.get(`${BASE_URL}/products/${id}`);
//         return response.data;
//     } catch (error) {
//         console.log('Error getting products for category', error);
//         return [];
//     }
// };



export const getAllCategories = async () => {
    return categories;
};

export const getCategoryProducts = async (id: any) => {
    const category = categories.find((cat) => cat.id === id);
    return category?.products || [];
};

export const getProductById = async (categoryId: string) => {
    try {
      const category = categories.find((cat) => cat.id === parseInt(categoryId));
      return category ? category.products : [];
    } catch (error) {
      console.log('Error fetching products', error);
      return [];
    }
  };
