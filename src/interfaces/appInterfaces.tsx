export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  name: string;
  password: string;
}

export interface ProductData {
  id?: string;
  categoryId: string;
  productName: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface User {
  name: string;
  email: string;
  role: string;
  status: boolean;
  google: boolean;
  image: string;
  uid: string;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
}

export interface Product {
  name: string;
  status: boolean;
  user: User;
  price: number;
  category: Category;
  available: boolean;
  id: string;
  image?: string;
}

export interface ProductResponse {
  product: Product;
}

export interface Category {
  name: string;
  status: boolean;
  user?: User;
  id?: string;
  _id?: string;
}

export interface CreatedBy {
  _id: string;
  name: string;
  email: string;
}
export interface CategoryListResponse {
  categories: Category[];
  total: number;
}

export interface CreatedBy {
  _id: string;
  name: string;
  email: string;
}
