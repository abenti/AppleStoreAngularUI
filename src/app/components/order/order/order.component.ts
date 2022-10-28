import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {ProductsOrderModel} from "../../../models/order.model";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  private url = environment.serverURL;
  products: ProductsOrderModel[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<ProductsOrderModel[]>(`${this.url}/order`).subscribe(
      res => {
        this.products = res
        console.log(this.products)
      });
  }

}
