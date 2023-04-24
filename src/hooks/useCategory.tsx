import {useEffect, useRef, useState} from 'react';
import {Category, CategoryListResponse} from '../interfaces/appInterfaces';
import productApi from '../api/productApi';

export const useCategory = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const getCategories = async () => {
    setIsLoading(true);
    const response = await productApi.get<CategoryListResponse>('/category', {
      params: {page: 0, limit: 5000},
    });

    setCategories(response.data.categories);
    setIsLoading(false);
  };

  const getCategoriesStatic = useRef(getCategories);

  useEffect(() => {
    getCategoriesStatic.current();
  }, []);

  return {isLoading, categories};
};
