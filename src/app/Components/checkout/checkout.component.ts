import { Component } from '@angular/core';
import { IProduct } from 'src/app/Model/IProduct';
import { CommonModule } from '@angular/common';
import { CartDetialsService } from 'src/app/Services/cart-detials.service';
import { CartProductsService } from 'src/app/Services/cart-products.service';
import { UserStoreService } from 'src/app/Services/user-store.service';
import { IRegister } from 'src/app/Model/iregister';
import { error } from 'jquery';
import { IUser } from 'src/app/Model/iuser';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
    public payPalConfig?: IPayPalConfig;
    products?: IProduct[];
    UserDetial: IUser | undefined;
    ProductQuantity? : number;
    TotalPrice: number = 0;
    showPromoCode: boolean = false;
    isPromoApplied : boolean = false;

    constructor(private serve : CartProductsService , private userserve : UserStoreService){}

    ngOnInit()
    {
      this.initConfig();
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
    private initConfig(): void {
      this.payPalConfig = {
        currency: 'USD',
        clientId: 'AUjVCXUc5fPSdqJ8Nxt-WauUA5KoE6AkIhoc6xPjtIRWCAQYstuoZ27bLqrUddTY9rEn0xENe2utO99s',
        createOrderOnClient: (data) => <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: `${this.TotalPrice}`,
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: `${this.TotalPrice}`
                  }
                }
              },
              items: [
                {
                  name: 'Enterprise Subscription',
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                    currency_code: 'USD',
                    value: `${this.TotalPrice}`,
                  },
                }
              ]
            }
          ]
        },
        advanced: {
          commit: 'true'
        },
        style: {
          label: 'paypal',
          layout: 'vertical'
        },
  
        onApprove: (data, actions) => {
          console.log('onApprove - transaction was approved, but not authorized', data, actions);
          actions.order.get().then((details : any) => {
            console.log('onApprove - you can get full order details inside onApprove: ', details);
          });
        },
  
        onClientAuthorization: (data) => {
          console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
          // Here you would inform your backend about the successful payment
        },
  
        onCancel: (data, actions) => {
          console.log('OnCancel', data, actions);
          // You can inform your customers about the cancellation
        },
  
        onError: (err) => {
          console.log('OnError', err);
          // You can inform your customers about the error
        },
        onClick: () => {
          console.log('onClick');
          // You can add a loading spinner while the PayPal button is clicked (and until it finishes loading)
        },
      };
    }
  
    applyPromoCode(promoCode: string) {
      switch (promoCode) {
        case 'promo1':
          this.applyDiscount(10);
          this.isPromoApplied = true;
          break;
        case 'promo2':
          this.applyDiscount(15);
          this.isPromoApplied = true;
          break;
        case 'promo3':
          this.applyDiscount(20);
          this.isPromoApplied = true;
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
