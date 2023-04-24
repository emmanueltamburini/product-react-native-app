import React, {
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Product,
  ProductData,
  ProductListResponse,
  ProductResponse,
} from '../interfaces/appInterfaces';
import productApi from '../api/productApi';

interface Props {
  children: JSX.Element | JSX.Element[];
}

interface ContextProps {
  products: Product[];
  loadProducts: () => Promise<void>;
  addProducts: (product: ProductData) => Promise<void>;
  updateProducts: (product: ProductData) => Promise<void>;
  deleteProducts: (id: string) => Promise<void>;
  loadProduct: (id: string) => Promise<Product | null>;
  uploadImage: (data: any, id: string) => Promise<void>;
}

const providerValueDummy: ContextProps = {
  products: [],
  loadProducts: () => new Promise(() => {}),
  addProducts: () => new Promise(() => {}),
  updateProducts: () => new Promise(() => {}),
  deleteProducts: () => new Promise(() => {}),
  loadProduct: () => new Promise(() => {}),
  uploadImage: () => new Promise(() => {}),
};

export const ProductContext = createContext<ContextProps>({
  ...providerValueDummy,
});

export const ProductProvider = ({children}: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const productPagination = useRef(0);

  const loadProducts = async () => {
    try {
      const response = await productApi.get<ProductListResponse>('/product', {
        params: {page: productPagination.current, limit: 50},
      });

      if (
        response.data.products.length > 0 &&
        response.data.total > products.length
      ) {
        setProducts(currentProducts => [
          ...currentProducts,
          ...response.data.products,
        ]);

        productPagination.current += 1;
      }
    } catch (error) {
      console.log('=== ProductContext.tsx [59] ===', error);
      setProducts([]);
    }
  };

  const addProducts = async (product: ProductData) => {};
  const updateProducts = async (product: ProductData) => {};
  const deleteProducts = async (id: string) => {};
  const loadProduct = async (id: string): Promise<Product | null> => {
    try {
      const response = await productApi.get<ProductResponse>(`/product/${id}`);

      return response.data.product;
    } catch (error) {
      console.log('=== ProductContext.tsx [80] ===', error);
      return null;
    }
  };
  const uploadImage = async (data: any, id: string) => {};

  const loadProductsStatic = useRef(loadProducts);

  useEffect(() => {
    loadProductsStatic.current();
  }, []);

  const providerValue = useMemo<ContextProps>(
    () => ({
      products,
      loadProducts,
      addProducts,
      updateProducts,
      deleteProducts,
      loadProduct,
      uploadImage,
    }),
    [products],
  );

  return (
    <ProductContext.Provider value={providerValue}>
      {children}
    </ProductContext.Provider>
  );
};
