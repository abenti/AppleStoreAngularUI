import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs'
import {ProductModelServer, ProductsTemplateModel} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = environment.serverURL;
  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<ProductsTemplateModel> {
    return this.http.get<ProductsTemplateModel>(this.url + '/home');
  }

  getSingleProduct(id: Number): Observable<ProductModelServer> {
    return this.http.get<ProductModelServer>(this.url + 'products/' + id);
  }

  getProductsFromCategory(item: String): Observable<ProductModelServer[]> {
    return this.http.get<ProductModelServer[]>(this.url + '/productList/' + item);
  }
}


