import { Component } from '@angular/core';
import { IProduct } from 'src/app/Model/IProduct';
import { ICart } from 'src/app/Model/icart';
import { CartDetialsService } from 'src/app/Services/cart-detials.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  CustomerID: number = 2 ;

  public products: any = [];
  public grandtotal ! : number ;


  constructor(private cartService: CartDetialsService) { }

  ngOnInit() {
    this.cartService.getProducts().subscribe(res => {
      this.products = res;
      this.grandtotal = this.cartService.getTotalPrice();
    })
    
  }

  removeItem(product : any)
  {
    this.cartService.removeCartItem(product);
  }

  emptycart()
  {
    this.cartService.removeAllcart();
  }

  

 
}

