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
  constructor(public cartService: CartService) {
    this.cartData = {
      _id: "",
      product: {
        _id: "",
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
  }

  ngOnInit() {
    this.cartService.cartDataObs$.subscribe(data => this.cartData = data);
  }

  cartCheckout(product: CartModelServer){
    this.cartService.CheckoutFromCart(product);
  }

  ChangeQuantity(increaseQuantity: Boolean) {
    this.cartService.UpdateCartData(increaseQuantity);
  }

}
