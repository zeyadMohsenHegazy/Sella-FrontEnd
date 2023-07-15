import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICart } from '../Model/icart';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICartProducts } from '../Model/icart-products';
import { IProduct } from '../Model/IProduct';

@Injectable({
  providedIn: 'root'
})
export class CartDetialsService {
  CartProducts: any[] = [];
 
  public cartItemList : any = [];
  public productList = new BehaviorSubject<any>([]);

  constructor() { 
    }
  

  getProducts() {
    this.CartProducts = JSON.parse(localStorage.getItem('Cart') || '[]');
    this.productList.next(this.CartProducts);
    console.log(this.CartProducts);
    return this.productList.asObservable();
    

  }

  setProducts(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addtocart(product: any) {
    
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    if('Cart' in localStorage)
    {
      this.CartProducts = JSON.parse(localStorage.getItem('Cart')!);
      
      let exist = this.CartProducts.find(ww => ww.productID == product.productID)
      if(exist)
      {
        alert("Product Already Exist in your Cart");
      }
      else
      {
      this.CartProducts.push(product);
      localStorage.setItem("Cart",JSON.stringify(this.CartProducts));
      }
     
    }else
    {
      this.CartProducts.push(product);
      localStorage.setItem("Cart",JSON.stringify(this.CartProducts));
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
        localStorage.setItem("Cart",JSON.stringify(this.CartProducts));
      }
    })
    
    
      
  }

  removeAllcart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
    localStorage.removeItem('Cart');
  }





}
