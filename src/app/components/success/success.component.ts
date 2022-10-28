import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ProductsOrderModel} from "../../models/order.model"
import {Router} from "@angular/router";
@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent{
  private url = environment.serverURL;
  order_id: any;
  private products: ProductsOrderModel[] = [];
  constructor(private http: HttpClient, private router: Router) {
    // @ts-ignore
    this.order_id = this.router.getCurrentNavigation().extras.state.id
    console.log(this.order_id.toString())
  }

}


