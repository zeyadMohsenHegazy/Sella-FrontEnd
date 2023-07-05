import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/Model/IProduct';
import { ProductsService } from '../../Services/products.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit{
  Products: IProduct[] = [];

  constructor(private productService: ProductsService) {

  }
  ngOnInit(): void {
    this.productService.GetAllProducts().subscribe({
      next: (products) => {
        this.Products = products;
      },
      error: (error) => {
        console.log(error);
      }
    })  
  }
}
