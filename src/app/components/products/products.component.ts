import { Component, OnInit } from '@angular/core';
import {ProductModelServer} from "../../models/product.model";
import {ProductService} from "../../services/product.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: ProductModelServer[] = [];
  constructor(private productService: ProductService, private router: Router, private activatedRoute: ActivatedRoute, private cartService: CartService) {

  }


  ngOnInit(): void {
    let paramValue = this.activatedRoute.snapshot.params['category'];
    this.productService.getProductsFromCategory(paramValue).subscribe((prods: any ) => {
      this.products = prods;
    });
  }

  AddProduct(id: Number) {
    this.cartService.AddProductToCart(id);
  }

  selectProduct(id: Number) {
    this.router.navigate(['/product', id]).then();
  }

}
