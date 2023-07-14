import { Component, OnInit } from '@angular/core';
import { CartDetialsService } from 'src/app/Services/cart-detials.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
public totalItem : number = 0 ;
public total : any = [];

constructor(private serve : CartDetialsService){
  this.total = this.serve.getCartItems();
 this.totalItem = this.total.length;
}
ngOnInit()
{
  
}

 }  
