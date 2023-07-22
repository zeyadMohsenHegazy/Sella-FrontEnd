import { Component } from '@angular/core';
import { IProduct } from 'src/app/Model/IProduct';
import { CommonModule } from '@angular/common';
import { CartDetialsService } from 'src/app/Services/cart-detials.service';
import { CartProductsService } from 'src/app/Services/cart-products.service';
import { UserStoreService } from 'src/app/Services/user-store.service';
import { IUser } from 'src/app/Model/iuser';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/Services/order.service';
import { IOrderProduct } from 'src/app/Model/iorder-product';
import { ICart } from 'src/app/Model/icart';
import { CartService } from 'src/app/Services/cart.service';
import { error } from 'jquery';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  public payPalConfig?: IPayPalConfig;
  products?: IProduct[];
  UserDetial: IUser | undefined;
  ProductQuantity?: number;
  TotalPrice: number = 0;
  userid: number = 0;
  cartid: number = 0;
  showPromoCode: boolean = false;
  isPromoApplied: boolean = false;
  Fulladdress: string = '';
  Fname: string = '';
  Lname: string = '';
  CPhone: string = '';
  CMail: string = '';

  pdfurl = '';

  constructor(private serve: CartProductsService,
    private userserve: UserStoreService,
    private toast: ToastrService,
    private route: Router, private OrderService: OrderService, private service: CartService
    , private del_serve: CartProductsService) { }

  ngOnInit() {
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
        next: (res) => {
          this.UserDetial = res;
          this.Fname = res.firstName;
          this.Lname = res.lastName;
          this.CMail = res.email;
        },
        error: (error) => { console.log(error); }
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
        actions.order.get().then((details: any) => {
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







  //cities
  selectedGovernorate: string = '';
  selectedCountry: string = '';
  selectedCity: string = '';
  selectedApartment: string = '';

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
  onCityChange(event: any) {
    const City = event.target.value;
    this.selectedCity = City;
  }

  onPhoneChange(event: any) {
    const P = event.target.value;
    this.CPhone = P;
  }

  onMailChange(event: any) {
    const M = event.target.value;
    this.CMail = M;
  }

  onFnameChange(event: any) {
    const F = event.target.value;
    this.Fname = F;
  }

  onLnameChange(event: any) {
    const L = event.target.value;
    this.Lname = L;
  }




  UserData: IUser | null = null;

  ok() {
    // console.log(this.products);
    // console.log("Here is my User ID :"+this.userid);
    // console.log("Here is my Cart ID :"+this.cartid);
    this.Fulladdress = 'Egypt' + ' - ' + this.selectedGovernorate + ' - ' + this.selectedCity + ' - ' + this.selectedApartment;
    // console.log("Address : "+ this.Fulladdress);
    // console.log("Phone" + this.CPhone);
    // console.log("Mail" + this.CMail);
    // console.log("Fname" + this.Fname);
    // console.log("Lname" + this.Lname);

    this.UserData = { userId: this.userid, firstName: this.Fname, lastName: this.Lname, email: this.CMail, address: this.Fulladdress, phone: this.CPhone };

    this.userserve.updateUser(this.UserData)
      .subscribe(
        response => {
          console.log(response); // log the response from the API
        },
        error => {
          console.log(error); // log any errors from the API

        }
      );

    console.log(this.UserData);

  }

  showButton = false;
  //Whatssapp API btn 
  CashOnDelivery() {
    let _OrderID: number = 0;
    //Data For What's App API
    let result: string = '';
    
    this.products?.forEach(element => {
      result += `- Product Name: ${element.productName} & Price:${element.price}\n`;
    });
    
    //////////////////////////////////////////whatssAPI////////////////////////////////
    let data: string = `token=glamz1fu79hu4dn0&to=+201202982836&body=Customer-Name:${this.UserData?.firstName} ${this.UserData?.lastName}\nCustomer-Address:${this.UserData?.address}\nCustomer-Phone:${this.UserData?.phone}\nOrder-Details:\n${result}\nTotalMoney=${this.TotalPrice}$`;
    //let data: string = `token=glamz1fu79hu4dn0&to=+201202982836&body=Order-Details:\n${result}\nTotalMoney=${this.TotalPrice}$`;


    console.log(data);
    let xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function (): void {
      if (this.readyState === this.DONE) {
        console.log(this.responseText);
      }
    });

    xhr.open("POST", "https://api.ultramsg.com/instance49044/messages/chat");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(data);

    /////////////////////////////////////whatssAPI////////////////////////////////////
    // Create an Order For User
    console.log("Here is my User ID :" + this.userid);
    this.OrderService.addOrder(this.userid)
      .subscribe(
        (res) => {
          _OrderID = res;
          localStorage.setItem("OrderID", res.toString());
          // Add in Order Products
          this.products?.forEach(element => {
            let Porder: IOrderProduct = { OrderID: _OrderID, ProductID: element.productID }
            this.OrderService.addProductOrder(Porder)
              .subscribe(
                () => console.log('Product order created.'),
                error => console.error(error)
              );
          });

        },
        (error) => { console.log(error); }
      );

    // Update Cart
    let cart = localStorage.getItem('CartID');
    let _cartId: number = 0;
    if (cart) {
      _cartId = parseInt(JSON.parse(cart));
      let cartdata: ICart = { CartID: _cartId, Quantity: 0, SubTotal: 0, CustomerID: this.userid }
      this.service.editCart(_cartId, cartdata)
        .subscribe(
          () => { },
          error => console.error(error)
        );

      // Delete All Product From Product Cart
      this.products?.forEach(element => {
        this.del_serve.delete(_cartId, element.productID)
          .subscribe(
            () => console.log('Cart product deleted.'),
            error => console.error(error)
          );
      });

      this.showButton = !this.showButton;

    }
  }

  Report() {
    
   // Generate a Invoivce
   let or_id: number = 0;
   let data = localStorage.getItem('OrderID');
   if (data) {
     or_id = parseInt(data);
     let Filname: string = "Invoice" + " " + or_id;
     this.OrderService.generateInvoice(or_id).subscribe(response => {
       const file = new Blob([response], { type: 'application/pdf' });
       const fileURL = URL.createObjectURL(file);
       window.open(fileURL);
       let a = document.createElement('a');
       a.download = Filname;
       a.href = fileURL;
       a.click();
     });
   }
  }

}



