import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICart } from '../Model/icart';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICartProducts } from '../Model/icart-products';
import { IProduct } from '../Model/IProduct';
import { CartProductsService } from './cart-products.service';
import { error } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class CartDetialsService {
  CartProducts: any[] = [];

  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);

  public _CartID!: number;




  constructor(private Pcartservice: CartProductsService) {
  }

  getProducts() {
    let data = localStorage.getItem('CartID');
    if (data) {
      let cartid = parseInt(JSON.parse(data));
      this.Pcartservice.getProductsByCartId(cartid)
        .subscribe(pro => {
          this.CartProducts = pro;
          this.productList.next(this.CartProducts);
          // console.log(this.CartProducts);
        });
      return this.productList.asObservable();
    } else {
      this.CartProducts = JSON.parse(localStorage.getItem('Cart') || '[]');
      this.productList.next(this.CartProducts);
      console.log(this.CartProducts);
      return this.productList.asObservable();
    }

  }

  setProducts(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addtocart(product: any) {
    let _cartid;
    let data = localStorage.getItem('CartID');
    if (data) {
      let _cartid = parseInt(JSON.parse(data));
      let Pcart: ICartProducts = { CartID: _cartid, ProductID: product.productID }
      this.Pcartservice.addCartProduct(Pcart)
      .subscribe(
        () => {console.log("Add")},
        (error) => {console.log(error)}
      );
    }

    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    if ('Cart' in localStorage) {
      this.CartProducts = JSON.parse(localStorage.getItem('Cart')!);

      let exist = this.CartProducts.find(ww => ww.productID == product.productID)
      if (exist) {
        alert("Product Already Exist in your Cart");
      }
      else {
        this.CartProducts.push(product);
        localStorage.setItem("Cart", JSON.stringify(this.CartProducts));
      }

    } else {
      this.CartProducts.push(product);
      localStorage.setItem("Cart", JSON.stringify(this.CartProducts));
    }

    this.getTotalPrice();
  }

  getTotalPrice(): number {
    let grandtotal = 0;
    this.CartProducts.map((a: any) => {
      grandtotal += a.price;
    })
    return grandtotal;
  }

  removeCartItem(product: any) {
    let grandtotal = 0;
    this.CartProducts.map((a: any, index: any) => {
      if (product.productID === a.productID) {
        this.CartProducts.splice(index, 1);
        localStorage.setItem("Cart", JSON.stringify(this.CartProducts));
      }

      let data = localStorage.getItem('CartID');
      if (data) {
        let _cartid = parseInt(JSON.parse(data));
        this.Pcartservice.delete(_cartid, product.productID)
          .subscribe(
            () => console.log("Deleted"),
            error => console.log(error)
          );
      }

    })



  }

  removeAllcart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
    localStorage.removeItem('Cart');
  }





}
