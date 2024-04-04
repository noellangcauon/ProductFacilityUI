import { createContext, useContext } from "react";
import ProductStore from "./productStore";

interface Store {
  productStore: ProductStore;
}

export const store: Store = {
  productStore: new ProductStore(),
};

export const storeContext = createContext(store);

export function useStore() {
  return useContext(storeContext);
}
