import {ProductModelServer} from "./product.model";

export interface CartModelServer {
  _id: string,
  product: ProductModelServer,
  quantity: number,
  total: number;
}

