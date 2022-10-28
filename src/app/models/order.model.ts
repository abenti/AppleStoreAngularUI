import {ProductModelServer} from "./product.model";

export interface ProductsOrderModel {
  id: string,
  product: ProductModelServer;
  quantity: string;
  total: number;
}
