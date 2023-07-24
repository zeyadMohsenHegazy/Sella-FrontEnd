import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/Model/IProduct';
import { ProductsService } from '../../Services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/Services/cart.service';
import { ICart } from 'src/app/Model/icart';
import { CartDetialsService } from 'src/app/Services/cart-detials.service';
import { ImagesService } from 'src/app/Services/images.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {


  Products: IProduct[] = [];
  filterProducts: IProduct[] = [];
  data: ICart = { CartID: 0, Quantity: 0, SubTotal: 0, CustomerID: 2 };


  constructor(private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router, private cartserv: CartService, private serve: CartDetialsService, private ImgService: ImagesService) {
    this.listFilter = "";
  }
  //zeyad
  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.GetAllProductsByCategory(id).subscribe({
      next: (products) => {
        this.Products = products;
        this.filterProducts = this.Products;
        this.GetImgsandAssigntoproducts();
      },
      error: (error) => {
        console.log(error);
      }
    })

    this.filterProducts.forEach((a: any) => {
      Object.assign(a, { Quantity: 1, total: a.total })
    })

  }

  GetImgsandAssigntoproducts() {
    this.filterProducts.forEach(element => {
      this.ImgService.GetProductImages(element.productID)
        .subscribe({
          next: (Img: any) => {
            element.ImgPaths = Img;
          },
          error: (err) => {
            console.log(err);
          }
        })
    });
  }


  private _listFilter: string = "";
  public get listFilter(): string {
    return this._listFilter;
  }
  public set listFilter(value: string) {
    this._listFilter = value;
    console.log(value);
    this.filterProducts = this.performFilter(value);
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.Products.filter((product: IProduct) =>
      product.productName.includes(filterBy)
    );
  }


  onBack() {
    this.router.navigate(['/home']);
  }


  viewDetails(id: number) {
    this.router.navigate(['/product/' + id]);
  }




  addtocart(item: any, proid: number) {
    console.log(item);
    console.log(proid);
    this.serve.addtocart(item);
  }


}
