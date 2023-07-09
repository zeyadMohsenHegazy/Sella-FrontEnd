import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/Model/IProduct';
import { ProductsService } from '../../Services/products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  Products: IProduct[] = [];

  constructor(private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router) { }


  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.GetAllProductsByCategory(id).subscribe({
      next: (products) => {
        this.Products = products;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  onBack() {
    this.router.navigate(['/home']);
  }
}
