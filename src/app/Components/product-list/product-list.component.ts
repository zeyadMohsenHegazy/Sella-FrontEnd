import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/Model/IProduct';
import { ProductsService } from '../../Services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/Services/cart.service';
import { ICart } from 'src/app/Model/icart';
import { CartDetialsService } from 'src/app/Services/cart-detials.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  user: any[] = [{ UserID: 1, Username: 'Kero' }];
  Products: IProduct[] = [];
  filterProducts: IProduct[] = [];
  data: ICart = { CartID: 0, Quantity: 0, SubTotal: 0, CustomerID: 2 };


  constructor(private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router, private cartserv: CartService, private serve: CartDetialsService) {
    this.listFilter = "";
  }
  //zeyad
  ngOnInit(): void {
    const userData = { username: 'Kero', userId: 1 };
    localStorage.setItem('user', JSON.stringify(userData));
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.GetAllProductsByCategory(id).subscribe({
      next: (products) => {
        this.Products = products;
        this.filterProducts = this.Products;
      },
      error: (error) => {
        console.log(error);
      }
    })

    this.filterProducts.forEach((a: any) => {
      Object.assign(a, { Quantity: 1, total: a.total })
    })

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

  // addCart() {
  //   this.cartserv.addCart(this.data).subscribe(response => {
  //     console.log(response);
  //   }, error => {
  //     console.error(error);
  //   });
  // }


  addtocart(item: any , proid : number) {
 console.log(proid);
   // this.serve.addtocart(item);

   //this.serve.additem(item);

    // let userId: any = 0;
    // const userDataString = localStorage.getItem('user');

    // if (!userDataString) {
    //   // save to local storage
    //  // this.serve.addtocart(item);
    //   console.log("not logged");
    // }
    // else {
    //   //save to database
    //   if (userDataString) {
    //     try {
    //       const userData = JSON.parse(userDataString);
    //       userId = userData.userId;
    //     } catch (error) {
    //       console.error('Error parsing userData:', error);
    //     }
    //   } else {
    //     console.error('userData not found in local storage');
    //   } 
    //  console.log(userId);
    //  console.log("logged");
    //  console.log(userDataString);
    // }

   // this.serve.addtocart(item);

    // if (userId > 0) {

    //   const cart: ICart = {
    //     CartID: 1,
    //     Quantity: item.Quantity,
    //     SubTotal: item.price,
    //     CustomerID: userId
    //   };

    //   this.cartserv.addCart(cart).subscribe(response => {
    //     console.log(response);
    //   }, error => {
    //     console.error(error);
    //   });

    // }
    // console.log(userId);
    
  }


}
