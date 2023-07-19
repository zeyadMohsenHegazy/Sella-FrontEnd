import { Component } from '@angular/core';
import { IProduct } from 'src/app/Model/IProduct';
import { CommonModule } from '@angular/common';
import { CartDetialsService } from 'src/app/Services/cart-detials.service';
import { CartProductsService } from 'src/app/Services/cart-products.service';
import { UserStoreService } from 'src/app/Services/user-store.service';
import { IRegister } from 'src/app/Model/iregister';
import { error } from 'jquery';
import { IUser } from 'src/app/Model/iuser';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
    products?: IProduct[];
    UserDetial: IUser | undefined;
    ProductQuantity? : number;
    TotalPrice: number = 0;
    showPromoCode: boolean = false;
    constructor(private serve : CartProductsService , private userserve : UserStoreService){}

    ngOnInit()
    {
      this.TotalPrice = 0;
      let user: any = localStorage.getItem('UserID');
      let userid = JSON.parse(user);

      let cart: any = localStorage.getItem('CartID');
      let cartid = JSON.parse(cart);

      this.serve.getProductsByCartId(cartid)
      .subscribe({
        next: (res) => {
          this.products = res;
          this.ProductQuantity = res.length;
          if (this.products) {
            this.products.forEach(element => {
              this.TotalPrice += element.price;
            });
          }
          console.log(this.products);       
        },
        error: (error) => {
          console.log(error);
        }
      })

      this.userserve.getUserById(userid)
      .subscribe({
       next : (res) => {this.UserDetial = res ;
         console.log(this.UserDetial);
         console.log("LELfkfir ---- "+"  " +this.UserDetial.firstName);} ,
         error : (error) => {console.log(error);}
        }
      );

      

    }

    applyPromoCode(promoCode: string) {
      switch (promoCode) {
        case 'promo1':
          this.applyDiscount(10);
          break;
        case 'promo2':
          this.applyDiscount(15);
          break;
        case 'promo3':
          this.applyDiscount(20);
          break;
        default:
          alert('Invalid promo code');
          break;
      }
      
    }

    applyDiscount(discountPercent: number) {
      this.showPromoCode = true;
      let totalPrice = this.TotalPrice;
      let discountAmount = totalPrice * (discountPercent / 100);
      this.TotalPrice = totalPrice - discountAmount;
    }

    

  ok() {
   

      
  }
}
