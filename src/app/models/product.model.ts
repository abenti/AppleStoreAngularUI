export interface ProductModelServer {
  _id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  price: number;
  images: string;
  color: string[];
  size: string[];
}

export interface ProductsTemplateModel {
  _id: string;
  name: string;
  image: string;
  price: number;
}


