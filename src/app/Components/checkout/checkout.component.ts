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
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
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
    userid : number = 0;
    cartid : number = 0;
    showPromoCode: boolean = false;
    isPromoApplied : boolean = false;

    constructor(private serve : CartProductsService , 
      private userserve : UserStoreService,
      private toast : ToastrService,
      private route : Router){}

    ngOnInit()
    {
      this.initConfig();
      this.TotalPrice = 0;
      let user: any = localStorage.getItem('UserID');
      this.userid = JSON.parse(user);

      let cart: any = localStorage.getItem('CartID');
      this.cartid = JSON.parse(cart);

      this.serve.getProductsByCartId(this.cartid)
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

      this.userserve.getUserById(this.userid)
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
          this.toast.success('Your order is completed successfully');
          this.route.navigate(['home']);
        },
  
        onClientAuthorization: (data) => {
          console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
          this.toast.info(' you should probably inform your server about completed transaction at this point' + data)   
        },
  
        onCancel: (data, actions) => {
          console.log('OnCancel', data, actions);
          this.toast.warning('You have canceled the order')
        },
  
        onError: (err) => {
          console.log('OnError', err);
          this.toast.error(err);
          
        },
        onClick: () => {
          console.log('onClick');
          this.toast.show('wait for paypal service')
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
   
    console.log(this.products);
    console.log("Here is my User ID :"+this.userid);
    console.log("Here is my Cart ID :"+this.cartid);

      
  }

  //cities
  selectedGovernorate: string ='';
  selectedCountry: string ='';
  selectedCity : string ='';
  selectedApartment: string ='';

  getCitiesByGovernorate(governorate: string | undefined): string[] {
    switch (governorate) {
      case 'Alexandria':
        return ['Alexandria', 'Borg El Arab', 'Abu Qir', 'Kom El Dikka', 'Montaza', 'Stanley'];
      case 'Aswan':
        return ['Aswan', 'Kom Ombo', 'Edfu', 'Abu Simbel', 'Daraw', 'Kalabsha'];
      case 'Asyut':
        return ['Asyut', 'Sohag', 'El Badari', 'Abnub', 'Dayrout', 'Ghanayem'];
      case 'Beheira':
        return ['Damanhur', 'Rashid', 'Itay El Barud', 'Kafr El Dawwar', 'Edko', 'El Delengat'];
      case 'Beni Suef':
        return ['Beni Suef', 'Nasser', 'El Wasta', 'Biba', 'Samasta'];
      case 'Cairo':
        return ['Cairo', 'Giza', 'Shubra El-Kheima', '6th of October City', 'Nasr City', 'Heliopolis'];
      case 'Dakahlia':
        return ['Mansoura', 'Talkha', 'Matareya', 'Aga', 'Dekernes', 'Mit Ghamr'];
      case 'Damietta':
        return ['Damietta', 'Kafr Saad', 'Faraskur', 'New Damietta', 'Ras El Bar', 'Zarqa'];
      case 'Faiyum':
        return ['Faiyum', 'Ibsheway', 'Shibin El Kom', 'Atsa', 'El Saff', 'Senoris'];
      case 'Gharbia':
        return ['Tanta', 'Kafr El Zayat', 'Mahmoudiyah', 'Basyoun', 'Zefta', 'Samannoud'];
      case 'Giza':
        return ['Giza', '6th of October City', 'Sheikh Zayed City', 'Imbaba', 'Boulak', 'Hawamdiyya'];
      case 'Ismailia':
        return ['Ismailia', 'Fayed', 'Qantara Sharq', 'Abu Suweir', 'El Tal El Kabir', 'Nefesha'];
      case 'Kafr El Sheikh':
        return ['Kafr El Sheikh', 'Desouk', 'Baltim', 'Metoubes', 'Qaleen', 'Sidi Salem'];
      case 'Luxor':
        return ['Luxor', 'Karnak', 'Esna', 'Armant', 'Al Bayadeyah', 'New Karnak'];
      case 'Matrouh':
        return ['Marsa Matrouh', 'Siwa', 'El Alamein', 'Sidi Barrani', 'El Negaila', 'El Hamam'];
      case 'Minya':
        return ['Minya', 'Maghagha', 'Samalut', 'Bani Mazar', 'Abu Qurqas', 'Deir Mawas'];
      case 'Monufia':
        return ['Shibin El Kom', 'Ashmun', 'Sadat City', 'Tala', 'Quesna', 'Berkat El Saba'];
      case 'New Valley':
        return ['Kharga', 'Dakhla', 'Farafra', 'Baris', 'Mut', 'Balat'];
      case 'North Sinai':
        return ['Arish', 'Rafah', 'Sheikh Zuweid', 'Bir al-Abed', 'Nakhl', 'Al-Qantarah'];
      case 'Port Said':
        return ['Port Said', 'Damieta', 'El Ferdan', 'El-Raswa', 'El-Sarw', 'El-Khabeir'];
      case 'Qalyubia':
        return ['Banha', 'Qalyub', 'Shubra Khit', 'Tukh', 'Khanka', 'El-Qanater El-Khayreya'];
      case 'Qena':
        return ['Qena', 'Luxor', 'Dandara', 'Alwaqf', 'Najaa Hammadi', 'Farshout'];
      case 'Red Sea':
        return ['Hurghada', 'Marsa Alam', 'Safaga', 'El Qoseir', 'Ras Gharib', 'Marsa Allam'];
      case 'Sharqia':
        return ['Zagazig', 'Sharqia', 'Bilbeis', '10th of Ramadan City', 'Zefta', 'Kafr Saqr', 'Abu Hammad'];
      case 'Sohag':
        return ['Sohag', 'Akhmim', 'Girga', 'Tima', 'Dar El Salam', 'Tahta'];
      case 'South Sinai':
        return ['Sharm El Sheikh', 'Dahab', 'Nuweiba', 'Ras Sedr', 'Saint Catherine', 'Taba'];
      case 'Suez':
        return ['Suez', 'Ain Sokhna', 'Ataqah', 'Arbaeen', 'Faisal', 'Hai Al-Salam'];
      default:
        return [];
    }
  }

  onGovernorateChange(event: any) {
    const governorate = event.target.value;
    this.selectedGovernorate = governorate;
  }
  onApartmentChange(event: any) {
    const apartment = event.target.value;
    this.selectedApartment = apartment;
  }
  onCityChange(event: any){
    const City = event.target.value;
    this.selectedCity = City;
  }



  //Whatssapp API btn 
  CashOnDelivery(){
    
  }
}
