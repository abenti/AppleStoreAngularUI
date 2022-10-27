import {Component, OnInit} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {Observable} from "rxjs";
import {CartModelServer} from "../../models/cart.model";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartData: CartModelServer;
  cartTotal: Number;
  constructor(public cartService: CartService) {
    this.cartData = {
      _id: 0,
      product: {
        _id: 0,
        name: "",
        category: "",
        description: "",
        image: "",
        price: 0,
        images: "",
        color: [],
        size: [],
      },
      quantity: 0,
      total: 0};
    this.cartTotal = 0;
  }

  ngOnInit() {
    this.cartService.cartDataObs$.subscribe(data => this.cartData = data);
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
  }

  ChangeQuantity(increaseQuantity: Boolean) {
    this.cartService.UpdateCartData(increaseQuantity);
  }

}
