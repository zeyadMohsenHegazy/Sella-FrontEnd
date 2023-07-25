import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/Model/IProduct';
import { ProductsService } from '../../Services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ImagesService } from 'src/app/Services/images.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private location: Location,
    private ImgService: ImagesService
  ) {}

  Product: IProduct = {
    productID: 0,
    productName: '',
    price: 0,
    quantity: 0,
    color: '',
    description: '',
    length: 0,
    width: 0,
    height: 0,
    categoryID: 0,
    categoryName: '',
    ImgPaths: [],
  };

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.GetProductoById(id).subscribe({
      next: (_product) => {
        this.Product = _product;
        this.GetImgsandAssigntoproducts();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  goBack(): void {
    this.location.back();
  }

  GetImgsandAssigntoproducts() {
    this.ImgService.GetProductImages(this.Product.productID).subscribe({
      next: (Img: any) => {
        this.Product.ImgPaths = Img;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
