import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {ProductsTemplateModel} from "../../models/product.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: ProductsTemplateModel[] = [];
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((prods: any ) => {
      this.products = prods;
    });
  }

  selectedProduct(category: string): void {
    this.router.navigate(['/productList', category.toLowerCase()]).then();
}

}
