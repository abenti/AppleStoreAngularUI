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
import {ProductsOrderModel} from "../models/order.model";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private url = environment.serverURL;
  private cartDataServer: CartModelServer = {
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
    total: 0,
  };

  cartTotal$ = new BehaviorSubject<Number>(0);
  // Data variable to store the cart information on the client's local storage

  cartDataObs$ = new BehaviorSubject<CartModelServer>(this.cartDataServer);

  constructor(private productService: ProductService,
              private http: HttpClient,
              private router: Router,
              private spinner: NgxSpinnerService,
              private toast: ToastrService) {

    this.cartTotal$.next(this.cartDataServer.total);
    this.cartDataObs$.next(JSON.parse(<any>localStorage.getItem("cart")));

    // @ts-ignore
    let info: CartModelServer = JSON.parse(localStorage.getItem('cart'));
    if (info !== null && info !== undefined) {
      this.cartDataServer = info;
    }
  }

  getProductsCart(): Observable<CartModelServer> {
    return this.http.get<CartModelServer>(this.url + '/carts')
  }

  AddProductToCart(prod: ProductModelServer) {
    if (this.cartDataServer.product.name === "" || this.cartDataServer.product._id === null) {
      console.log(prod)
      this.cartDataServer.product = prod;
      // @ts-ignore
      this.cartDataServer.quantity = 1;
      // @ts-ignore
      this.cartDataServer.total = prod.price * this.cartDataServer.quantity;
      localStorage.setItem('cart', JSON.stringify(this.cartDataServer));
      this.cartDataObs$.next({...this.cartDataServer});
      this.toast.success(`${prod.name} added to the cart.`, "Product Added", {
        timeOut: 1500,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      })
    } else {
      // @ts-ignore
      this.cartDataServer.quantity += 1;
      // @ts-ignore
      this.cartDataServer.total = this.cartDataServer.product.price * this.cartDataServer.quantity;
      localStorage.setItem('cart', JSON.stringify(this.cartDataServer));
      this.cartDataObs$.next({...this.cartDataServer});
      this.toast.info(`${prod.name} quantity updated in the cart.`, "Product Updated", {
        timeOut: 1500,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      })
    }
    // });
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
      this.cartDataServer.quantity -= 1;
      // @ts-ignore
      this.cartDataServer.total -= this.cartDataServer.product.price;
      // @ts-ignore
      this.cartDataObs$.next({...this.cartDataServer});
      if (this.cartDataServer.quantity < 1) {
        this.DeleteProductFromCart();
        this.cartDataObs$.next({...this.cartDataServer});
      }
      localStorage.setItem('cart', JSON.stringify(this.cartDataServer));

    }

  }

  DeleteProductFromCart() {
    if (window.confirm('Are you sure you want to delete the item?')) {
      this.cartDataServer = {
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
        total: 0
      };
      localStorage.setItem('cart', JSON.stringify(this.cartDataServer));
      this.cartDataObs$.next({...this.cartDataServer});
    }
    // If the user doesn't want to delete the product, hits the CANCEL button
    else {
      return;
    }
  }

  CheckoutFromCart(product: CartModelServer) {
    // @ts-ignore
    this.http.post(`${this.url}/order`, product)
      .subscribe(
        // @ts-ignore
        (data:ProductsOrderModel) => {
          console.log(data);
          const navigationExtras: NavigationExtras = {
            state: {
              product: data.product,
              id: data.id,
              total: data.total
            }
          };
          this.spinner.hide().then();
          this.router.navigate(['/success'], navigationExtras).then(p => {
            this.cartTotal$.next(0);
            this.resetServerData();
            localStorage.setItem('cart', JSON.stringify(this.cartDataServer));
          });
        },
        err => { this.spinner.hide().then();
          this.router.navigateByUrl('/cart').then();
          this.toast.error(`Sorry, failed to book the order`, "Order Status", {
            timeOut: 1500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          })
        })
  }

  private resetServerData() {
    this.cartDataServer = {
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
      total: 0
    };
    this.cartDataObs$.next({...this.cartDataServer});
  }
}

interface OrderConfirmationResponse {
  _id: string;
  products: [{
    id: String,
    numInCart: String
  }]
}

