import axios, { AxiosResponse } from "axios";
import { Product } from "../models/Product";

axios.defaults.baseURL = import.meta.env.VITE_BASEURL_KEY;

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Product = {
  GetAllProducts: (search: string) =>
    request.get<Product[]>(`product/getallproducts/${search}`),
  CreateProduct: (product: Product) =>
    request.post<number>(`product/createproduct`, product),
  DeleteProduct: (id: number) =>
    request.delete<void>(`product/deleteproduct/${id}`),
};

const agent = {
  Product,
};

export default agent;
