import { makeAutoObservable, runInAction } from "mobx";
import { Product } from "../models/Product";
import agent from "../api/agent";

export default class ProductStore {
  product: Product[] | null = null;
  constructor() {
    makeAutoObservable(this);
  }

  getAllProducts = async (search: string) => {
    const products = await agent.Product.GetAllProducts(search);
    runInAction(() => {
      this.product = products;
    });

    return this.product;
  };

  createProducts = async (product: Product) => {
    const totalAmount = await agent.Product.CreateProduct(product);
    return totalAmount;
  };

  deleteProduct = async (id: number) => {
    await agent.Product.DeleteProduct(id);
  };
}
