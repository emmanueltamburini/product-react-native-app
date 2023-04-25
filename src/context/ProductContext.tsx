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
  ProductInnerResponse,
  ProductListResponse,
  ProductResponse,
} from '../interfaces/appInterfaces';
import productApi from '../api/productApi';
import {ImagePickerResponse} from 'react-native-image-picker';

interface Props {
  children: JSX.Element | JSX.Element[];
}

interface ContextProps {
  products: Product[];
  loadProducts: () => Promise<void>;
  refreshProducts: () => Promise<void>;
  addProducts: (product: ProductData) => Promise<ProductInnerResponse>;
  updateProducts: (product: ProductData) => Promise<ProductInnerResponse>;
  deleteProducts: (id: string) => Promise<ProductInnerResponse>;
  loadProduct: (id: string) => Promise<Product | null>;
  uploadImage: (data: any, id: string) => Promise<ProductInnerResponse>;
}

const providerValueDummy: ContextProps = {
  products: [],
  loadProducts: () => new Promise(() => {}),
  refreshProducts: () => new Promise(() => {}),
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
      console.log(JSON.stringify(error));
      setProducts([]);
    }
  };

  const refreshProducts = async () => {
    try {
      const response = await productApi.get<ProductListResponse>('/product', {
        params: {page: 0, limit: 50},
      });

      if (
        response.data.products.length > 0 &&
        response.data.total > products.length
      ) {
        setProducts([...response.data.products]);

        productPagination.current = 1;
      }
    } catch (error) {
      console.log(JSON.stringify(error));
      setProducts([]);
    }
  };

  const addProducts = async (product: ProductData) => {
    try {
      const response = await productApi.post<Product>('/product', {
        ...product,
        id: undefined,
      });

      setProducts(currentProducts => [...currentProducts, response.data]);
      return {id: response.data.id};
    } catch (error) {
      console.log(JSON.stringify(error));
      const errorMessage = ((error as any).response?.data?.msg ||
        (error as any).response?.data?.errors[0].msg ||
        'Bad information') as string;

      return {id: '', message: errorMessage};
    }
  };

  const updateProducts = async (product: ProductData) => {
    try {
      const response = await productApi.put<Product>(`/product/${product.id}`, {
        ...product,
        id: undefined,
      });

      setProducts(currentProducts =>
        currentProducts.map(currentProduct =>
          currentProduct.id === response.data.id
            ? response.data
            : currentProduct,
        ),
      );
      return {id: response.data.id};
    } catch (error) {
      console.log(JSON.stringify(error));
      const errorMessage = ((error as any).response?.data?.msg ||
        (error as any).response?.data?.errors[0].msg ||
        'Bad information') as string;
      return {id: '', message: errorMessage};
    }
  };

  const deleteProducts = async (id: string) => {
    try {
      await productApi.delete<Product>(`/product/${id}`);

      setProducts(currentProducts =>
        currentProducts.filter(currentProduct => currentProduct.id !== id),
      );
      return {id};
    } catch (error) {
      console.log(JSON.stringify(error));
      const errorMessage = ((error as any)?.response?.data ||
        (error as any)?.response?.data?.msg ||
        (error as any).response?.data?.errors[0].msg ||
        'Bad information') as string;
      return {id: '', message: errorMessage};
    }
  };

  const loadProduct = async (id: string): Promise<Product | null> => {
    try {
      const response = await productApi.get<ProductResponse>(`/product/${id}`);

      return response.data.product;
    } catch (error) {
      console.log(JSON.stringify(error));
      return null;
    }
  };

  const uploadImage = async (data: ImagePickerResponse, id: string) => {
    let body;

    if (data.assets) {
      body = {
        uri: data.assets[0].uri,
        type: data.assets[0].type,
        name: data.assets[0].fileName,
      };
    }

    const formData = new FormData();
    formData.append('file', body);

    try {
      const response = await productApi.put<Product>(
        `/upload/product/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      setProducts(currentProducts =>
        currentProducts.map(currentProduct =>
          currentProduct.id === response.data.id
            ? response.data
            : currentProduct,
        ),
      );
      return {id: response.data.id};
    } catch (error) {
      console.log(JSON.stringify(error));
      const errorMessage = ((error as any).response?.data?.msg ||
        (error as any).response?.data?.errors[0].msg ||
        'Bad information') as string;
      return {id: '', message: errorMessage};
    }
  };

  const loadProductsStatic = useRef(loadProducts);
  const refreshProductsStatic = useRef(refreshProducts);

  useEffect(() => {
    loadProductsStatic.current();
  }, []);

  const providerValue = useMemo<ContextProps>(
    () => ({
      products,
      loadProducts: loadProductsStatic.current,
      refreshProducts: refreshProductsStatic.current,
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
