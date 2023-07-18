import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup , Validator, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'jquery';
import { ICart } from 'src/app/Model/icart';
import { ICartProducts } from 'src/app/Model/icart-products';
import { CartProductsService } from 'src/app/Services/cart-products.service';
import { CartService } from 'src/app/Services/cart.service';
import { JWTService } from 'src/app/Services/jwt.service';
import { ToastrService } from 'ngx-toastr';
import { UserStoreService } from 'src/app/Services/user-store.service';
import { ProductDetailsComponent } from '../../product-details/product-details.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm! : FormGroup;
  constructor(private fb: FormBuilder , private toastr: ToastrService , 
    private auth: JWTService, 
    private router : Router , 
    private Pcartservic : CartProductsService , private CartService : CartService,
    private storeToken : UserStoreService){}

  ngOnInit(): void {
    const userData = { username: 'Kero', userId: 1 };
    localStorage.setItem('user', JSON.stringify(userData));

    this.loginForm = this.fb.group({
      Email: ['',Validators.required],
      Password: ['',Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      //send the Obj to database 
      this.auth.Login(this.loginForm.value)
      .subscribe({
        next:(value)=> {
            this.auth.StoreToken(value.token)
            this.auth.StoreUserId(value.user)
            const TokenPayload = this.auth.DecodeToken();
            this.storeToken.SetFullNameForStore(TokenPayload.unique_name);
            this.toastr.success(value.message , 'Log in Success');
            this.router.navigate(['home']);
            // get or create user cart id , user id 
           this.CartFun();
        },
        error: (err) => {
          if (err?.error?.message) {
            this.toastr.error(err.error.message, 'Error');
          } else {
            this.toastr.error(err, 'Error');
          }
        },
      })
    }
    else{
      this.ValidateFormFileds(this.loginForm);
      this.toastr.error('Login Form is Invalid');   
    }
   
  }

  private ValidateFormFileds(_FormGroup :FormGroup){
    Object.keys(_FormGroup.controls).forEach(field =>{
      const control = _FormGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true})
      }
      else if(control instanceof FormGroup){
        this.ValidateFormFileds(control)
      }
    })
  }

  SignOut(){
    this.auth.SignOut();
  }

  CartFun()
  {
    // 1 - Get Products From local storage
    let data = localStorage.getItem('Cart');
    if(data)
    {
      let cartDataDetials : any [] = JSON.parse(data);
      // 2 - Get User ID From local storage
      let user : any = localStorage.getItem('user');
      let userid = JSON.parse(user).userId;
      //console.log('User ID Login : ' + userid);
      /* 3 - Add Cart in DB :
                        => if User ID is exists return his own Cart Id
                        => if User ID isn't exist Create a new Cart & return his own Cart Id                 
       */
      let cartdata:ICart={CartID:77 , Quantity : 0 , SubTotal : 0 ,CustomerID:userid}
      this.CartService.addCart(cartdata)
      .subscribe(
        (cartId : any) => {
          //console.log('CCCC',cartId);
          localStorage.setItem('CartID', cartId);
      // 4 - For each Product in LocalStorage Add Product ID + Cart ID in CartProduct table
          cartDataDetials.forEach(element  => {
           // console.log('Product ID in Cart : '+ element.productID);
            //console.log("KKKKKKKK",cartId);
              let Pcart : ICartProducts = { CartID : cartId , ProductID : element.productID}
    
              this.Pcartservic.addCartProduct(Pcart)
              .subscribe(
                () => { 
                  console.log("Added");
                  localStorage.removeItem('Cart');
               } ,
                (error) => {console.log(error);}
              );
            
          });
        },
        (error) => {
          console.error(error);
        }
        );
    }

    else{
      let user : any = localStorage.getItem('user');
      let userid = JSON.parse(user).userId;
      let cartdata:ICart={CartID:77 , Quantity : 0 , SubTotal : 0 ,CustomerID:userid}
      this.CartService.addCart(cartdata)
      .subscribe(
        (cartId : any) => {
          //console.log('CCCC',cartId);
          localStorage.setItem('CartID', cartId);
        },
        (error) => {
          console.log(error);
        }
        );
    }
 
  }
}
