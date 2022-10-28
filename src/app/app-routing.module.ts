import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {CartComponent} from "./components/cart/cart.component";
import {ProductsComponent} from "./components/products/products.component";
import {ProductComponent} from "./components/product/product.component";
import {SuccessComponent} from "./components/success/success.component";
import {OrderComponent} from "./components/order/order/order.component";


const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'productList/:category', component: ProductsComponent
  },
  {
    path: 'product/:id', component: ProductComponent
  },
  {
    path: 'cart', component: CartComponent
  },
  {
    path: 'orders', component: OrderComponent
  },
  {
    path: 'success', component: SuccessComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

