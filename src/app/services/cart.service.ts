import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import {Observable} from "rxjs";
import {CartModelServer} from "../models/cart.model";
import {environment} from "../../environments/environment";
import {ProductService} from "./product.service";
import {BehaviorSubject} from "rxjs";
import {ProductModelServer} from "../models/product.model";
import {NavigationExtras, Router} from "@angular/router";
// import {OrderService} from "./order.service";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private url = environment.serverURL;
  private cartDataServer: CartModelServer = {
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
    total: 0,
  };

  cartTotal$ = new BehaviorSubject<Number>(0);
  // Data variable to store the cart information on the client's local storage

  cartDataObs$ = new BehaviorSubject<CartModelServer>(this.cartDataServer);

  constructor(private productService: ProductService,
              // private orderService: OrderService,
              private http: HttpClient,
              private router: Router,
              private spinner: NgxSpinnerService,
              private toast: ToastrService) {

    this.cartTotal$.next(this.cartDataServer.total);
    this.cartDataObs$.next(this.cartDataServer);

    // @ts-ignore
    let info: CartModelServer = JSON.parse(localStorage.getItem('cart')) | undefined;

    if (info !== null && info !== undefined) {
      this.cartDataServer = info;

      // this.productService.getSingleProduct(p.id).subscribe((actualProdInfo: ProductModelServer) => {
      //     if (this.cartDataServer !== undefined) {
      //       this.cartDataServer.product = actualProdInfo;
      //       this.cartDataServer._id = actualProdInfo._id;
      //       // @ts-ignore
      //       this.cartDataClient._id = this.cartDataServer._id;
      //       // @ts-ignore
      //       this.cartDataClient.total = actualProdInfo.price*this.cartDataServer.quantity;
      //       // @ts-ignore
      //       this.cartDataClient.total = this.cartDataServer.total;
      //       // @ts-ignore
      //       this.cartDataClient.quantity = this.cartDataServer.quantity;
      //       localStorage.setItem('cart', JSON.stringify(this.cartDataServer));
      //     }
      //     this.cartDataObs$.next({...this.cartDataServer});
      //   })
    }
  }

  getProductsCart(): Observable<CartModelServer>{
    return this.http.get<CartModelServer>(this.url + '/carts')
  }

  AddProductToCart(id: any) {
  console.log(id)
    this.productService.getSingleProduct(id).subscribe(prod => {
      // If the cart is empty
      if (this.cartDataServer.product === undefined) {
        this.cartDataServer.product = prod;
        // @ts-ignore
        this.cartDataServer.total = prod.price*this.cartDataServer.quantity;
        localStorage.setItem('cart', JSON.stringify(this.cartDataServer));
        this.cartDataObs$.next({...this.cartDataServer});
        this.toast.success(`${prod.name} added to the cart.`, "Product Added", {
          timeOut: 1500,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        })
      }
      else {
           // @ts-ignore
          this.cartDataServer.quantity = this.cartDataServer.quantity++;
          this.toast.info(`${prod.name} quantity updated in the cart.`, "Product Updated", {
            timeOut: 1500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          })
        }
    });
  }
  UpdateCartData(increase?: Boolean) {
    if (increase) {
      // @ts-ignore
      this.cartDataServer.quantity++;
      // @ts-ignore
      this.cartDataServer.total += this.cartDataServer.product.price;
      this.cartDataObs$.next({...this.cartDataServer});
      localStorage.setItem('cart', JSON.stringify(this.cartDataServer));
    } else {
      // @ts-ignore
      this.cartDataServer.quantity--;
      // @ts-ignore
      this.cartDataServer.total -= this.cartDataServer.product.price;
      // @ts-ignore
      if (this.cartDataServer.quantity < 1) {
        this.DeleteProductFromCart();
        this.cartDataObs$.next({...this.cartDataServer});
      }

    }

  }

  DeleteProductFromCart() {
    if (window.confirm('Are you sure you want to delete the item?')) {
      this.cartDataServer = {
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
      localStorage.setItem('cart', JSON.stringify(this.cartDataServer));
      this.cartDataObs$.next({...this.cartDataServer});
    }
    // If the user doesn't want to delete the product, hits the CANCEL button
    else {
      return;
    }


  }
}


