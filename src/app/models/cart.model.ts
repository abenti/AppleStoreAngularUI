import {ProductModelServer} from "./product.model";

export interface CartModelServer {
  _id: any,
  product: ProductModelServer,
  quantity: Number,
  total: Number;
}

