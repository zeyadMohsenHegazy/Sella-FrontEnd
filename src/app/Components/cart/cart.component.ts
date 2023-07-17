import { Component } from '@angular/core';
import { error } from 'jquery';
import { IProduct } from 'src/app/Model/IProduct';
import { ICart } from 'src/app/Model/icart';
import { CartDetialsService } from 'src/app/Services/cart-detials.service';
import { CartProductsService } from 'src/app/Services/cart-products.service';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  CustomerID: number = 2;

  public products: any = [];
  public grandtotal !: number;
  public cartItems: any[] = [];

  public totalItem: number = 0;

  constructor(private cartService: CartDetialsService, private Pcartservice: CartProductsService , private serv : CartService) {

  }
  ngOnInit() {
    this.cartService.getProducts()?.subscribe(res => {
      this.products = res;
      this.totalItem = res.length;
      this.grandtotal = this.cartService.getTotalPrice();
    })


  }

  removeItem(product: any) {
    this.cartService.removeCartItem(product);
  }

  emptycart() {
    this.cartService.removeAllcart();
  }

  Confirm() {

    // 1 - Get SubTotal & Quantity
    //console.log("count  : " + this.totalItem + "subtotal : " + this.grandtotal);

    // 2 - Get User ID
    let user: any = localStorage.getItem('user');
    let userid = JSON.parse(user).userId;
    // console.log(userid);
    
    const cartData = JSON.parse(localStorage.getItem('Cart') || '[]');
    // 3 - Get Cart ID
    let cart = localStorage.getItem('CartID');
    if (cart) {
      let _cartId = parseInt(JSON.parse(cart));
      //console.log(_cartId);
      const cart_edited: ICart = {
        CartID: _cartId,
        Quantity: this.totalItem,
        SubTotal: this.grandtotal,
        CustomerID: userid // Replace with the actual customer ID
      };
      this.serv.editCart(_cartId,cart_edited)
      .subscribe( () => {console.log("Cart Edited") ; },
      (error) => {console.log(error);}
      );

    }
    // 4 - Get if Some Product in Local Storage 



  }



}

