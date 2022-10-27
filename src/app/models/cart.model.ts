import {ProductModelServer} from "./product.model";

export interface CartModelServer {
  _id: Number,
  product: ProductModelServer,
  quantity: Number,
  total: Number;
}

